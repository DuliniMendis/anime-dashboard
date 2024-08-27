"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../lib/definitions";
import { useRouter } from "next/navigation";
import { logOut } from "../lib/actions";
import { getCookie, setCookie } from "cookies-next";

type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const USER_COOKIE_KEY = "anime_user";

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>();

  const router = useRouter();

  useEffect(() => {
    const userCookie = getCookie(USER_COOKIE_KEY);
    console.log("cookie on load", userCookie);
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

export const useUserContext = () => {
  return useContext(UserContext);
};
