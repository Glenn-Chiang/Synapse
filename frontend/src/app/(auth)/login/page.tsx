"use client"

export default function Login() {

  return (
    <main>
      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}>
        Sign in with Google
      </a>
    </main>
  )
}