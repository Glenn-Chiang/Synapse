import Image from "next/image";

export default function Login() {
  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <h1 className="text-2xl">Welcome to Synapse</h1>
      <a
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
        className="bg-slate-900 p-2 rounded-md flex gap-2 items-center"
      >
        <Image
          src={"https://www.google.com/favicon.ico"}
          alt=""
          width={20}
          height={20}
        />
        <span>Continue with Google</span>
      </a>
      <p className="text-slate-500 w-1/2 text-center">
        Your account will be created when you sign in for the first time
      </p>
    </section>
  );
}
