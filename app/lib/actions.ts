"use server";

import { signIn, signOut } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { UserDBRecord } from "./definitions";
// ...

export async function authenticate(_, formData: FormData) {
  console.log("in authenticatio", formData);
  try {
    console.log({ formData });
    await signIn("credentials", formData);
  } catch (error) {
    console.log("error", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials. sdfsd";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logOut() {
  console.log("in logOut");

  await signOut();
}

export async function editDetails(
  prevUserName: string,
  username: string,
  jobTitle: string
) {
  try {
    if (prevUserName !== username) {
      const users =
        await sql<UserDBRecord>`UPDATE username, job_title FROM anime_users WHERE username=${username}`;

      if (users.rows.length) {
        throw new Error("Username already exists.");
      }
    }
    await sql`UPDATE anime_users SET username=${username}, job_title=${jobTitle} WHERE username=${prevUserName}`;
  } catch (error) {
    throw new Error("Failed to update user.");
  }
}

export async function doesUsernameAndJobTitleMatch(
  username: string,
  jobTitle: string
) {
  const users =
    await sql<UserDBRecord>`SELECT username FROM anime_users WHERE username=${username} AND job_title=${jobTitle}`;

  return users.rows.length === 0;
}
