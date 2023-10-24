import { User } from '@/types'
import {cookies} from 'next/headers'

const getCurrentUser = () => {
  const cookieStore = cookies()
  const userCookie = cookieStore.get('user')
  if (!userCookie) return null
  const currentUser: User = JSON.parse(userCookie.value)
  return currentUser;
}

export {getCurrentUser}