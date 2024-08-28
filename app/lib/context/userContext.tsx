'use client'

import React, { createContext, useContext } from 'react'
import { User } from '../types'

type UserContextType = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
})

export const useUserContext = () => {
  return useContext(UserContext)
}
