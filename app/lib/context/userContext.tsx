'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../types'

type UserContextType = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const USER_COOKIE_KEY = 'anime_user'

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
})

export const useUserContext = () => {
  return useContext(UserContext)
}
