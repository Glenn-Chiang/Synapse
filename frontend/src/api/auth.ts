const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const signInWithGoogle = async () => {
  const res = await fetch(`${BASE_URL}/auth/google`, {cache: 'no-store'})
  console.log(res.headers)
}

