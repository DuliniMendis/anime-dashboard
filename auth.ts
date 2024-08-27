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
  let user: User;
  try {
    const users =
      await sql<UserDBRecord>`SELECT username, job_title FROM anime_users WHERE username=${username}`;

    if (!users.rows.length) {
      await sql<User>`INSERT INTO anime_users (username, job_title) VALUES (${username}, ${jobTitle})`;
      const createdUsers =
        await sql<UserDBRecord>`SELECT username, job_title FROM anime_users WHERE username=${username}`;
      user = {
        id: createdUsers.rows[0].id,
        username: createdUsers.rows[0].username,
        jobTitle: createdUsers.rows[0].job_title,
      };
    } else {
      user = {
        id: users.rows[0].id,
        username: users.rows[0].username,
        jobTitle: users.rows[0].job_title,
      };
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }

  console.log("user", user);

  if (jobTitle !== user.jobTitle) {
    throw new Error("Job title does not match.");
  }

  return user;
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
