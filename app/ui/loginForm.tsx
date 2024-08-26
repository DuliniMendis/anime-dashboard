"use client";

import { useFormState } from "react-dom";
import { authenticate } from "@/app/lib/actions";

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <h1>Please log in to continue.</h1>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <div className="relative">
              <input
                id="username"
                name="username"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="jobTitle">Job title</label>
            <div className="relative">
              <input
                id="jobTitle"
                name="jobTitle"
                placeholder="Enter job title"
                required
              />
            </div>
          </div>
        </div>
        <button aria-disabled={isPending}>Log in</button>
        <div aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <p>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};
