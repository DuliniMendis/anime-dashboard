"use client";

import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { User } from "../types";
import { USER_COOKIE_KEY, UserContext } from "../context/userContext";

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>();

  const router = useRouter();

  useEffect(() => {
    const userCookie = getCookie(USER_COOKIE_KEY);
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setCookie(USER_COOKIE_KEY, JSON.stringify(user));
    }
  }, [user, router]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
