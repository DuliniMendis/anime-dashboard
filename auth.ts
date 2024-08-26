import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { User, UserDBRecord } from "./app/lib/definitions";
import { z } from "zod";

async function getUser(
  username: string,
  jobTitle: string
): Promise<User | undefined> {
  console.log({ username, jobTitle });
  try {
    const users =
      await sql<User>`SELECT username, job_title as jobTitle FROM anime_users WHERE username=${username}`;
    console.log({ users });

    if (!users.rows.length) {
      await sql<User>`INSERT INTO anime_users (username, job_title) VALUES (${username}, ${jobTitle})`;
      const createdUser =
        await sql<User>`SELECT username, job_title as jobTitle FROM anime_users WHERE username=${username}`;
      console.log({ createdUser });
      return createdUser.rows[0];
    }

    if (jobTitle !== users.rows[0].jobTitle) {
      throw new Error("Job title does not match.");
    }

    return users.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log({ credentials });
        const parsedCredentials = z
          .object({ username: z.string(), jobTitle: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, jobTitle } = parsedCredentials.data;
          const user = await getUser(username, jobTitle);
          if (!user) return null;
          return user;
        }
        return null;
      },
    }),
  ],
});
