import { User } from '@/types'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import {cookies} from 'next/headers'

const getCurrentUser = () => {
  const cookieStore = cookies()
  const userCookie = cookieStore.get('user') 
  
  if (!userCookie) {
    throw new Error('missing user cookie')
  }

  const currentUser: User = JSON.parse(userCookie.value)
  return currentUser;
}

export {getCurrentUser}