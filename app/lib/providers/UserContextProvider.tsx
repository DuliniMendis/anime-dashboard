'use client'

import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useState, useEffect } from 'react'
import { User } from '../types'
import { UserContext } from '../context/userContext'
import { USER_COOKIE_KEY } from '../constants'

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const userCookie = getCookie(USER_COOKIE_KEY)
    if (userCookie) {
      setUser(JSON.parse(userCookie))
    }
  }, [])

  useEffect(() => {
    if (user) {
      setCookie(USER_COOKIE_KEY, JSON.stringify(user))
    } else {
      deleteCookie(USER_COOKIE_KEY)
    }
  }, [user])

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
