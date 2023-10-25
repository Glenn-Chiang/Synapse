export default function Login() {
  return (
    <section>
      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}>
        Sign in with Google
      </a>
    </section>
  )
}