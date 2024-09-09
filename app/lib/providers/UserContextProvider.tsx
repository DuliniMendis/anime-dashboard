'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { User } from '../types'
import { useSession } from 'next-auth/react'
import { getUser } from '../actions'

type UserContextType = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

// Context and provider to store of user data once it's fetched from the server
// and share with other components.
export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
})

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  const { data: session } = useSession()

  const fetchUser = async (id: string) => {
    const user = await getUser(id) // fetch from the server
    setUser(user)
  }

  // User is fetched from the server when the session changes between authenticated and unauthenticated states
  useEffect(() => {
    if (session?.user?.id) {
      fetchUser(session.user.id)
    }
  }, [session?.user?.id])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
