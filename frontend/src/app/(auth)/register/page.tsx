import { SubmitButton } from "@/components/buttons";
import { faLock, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Register() {
  return (
    <section className="flex flex-col items-center gap-10 w-full p-4">
      <h1 className="text-2xl">Create an account</h1>

      <form className="flex flex-col gap-8 w-full md:w-1/2">
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <label className="flex gap-2 items-center text-slate-400">
              <FontAwesomeIcon icon={faUserCircle} />
              Username
            </label>
            <input className="bg-slate-900" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex gap-2 items-center text-slate-400">
              <FontAwesomeIcon icon={faLock} />
              Password
            </label>
            <input className="bg-slate-900" />
          </div>
        </div>
        <SubmitButton>Register</SubmitButton>
      </form>

      <div>
        Already have an account?{" "}
        <Link href={"/login"} className="text-sky-500 hover:text-sky-400">
          Login
        </Link>
      </div>
    </section>
  );
}
