import { useAuthActions } from "@convex-dev/auth/react"
import { api } from "../../convex/_generated/api.js"
import { Unauthenticated, useQuery } from "convex/react"
import { useNavigate } from "react-router"
import { Logo } from "../components/logo.js";
import { Button } from "../components/ui/button.js";
import { HrWithText } from "../components/hrWithtext.tsx";
export default function AuthPage() {
  const user = useQuery(api.user.currentUser);
  const navigate = useNavigate()
  const { signIn } = useAuthActions()
  console.log(user)

  if (user) {
    navigate(-1);
  }

  return (
    <>
      <header>
        <figure className="flex flex-col mt-16">
          <Logo className="mx-auto" />
          <figcaption className="text-center mt-4">
            <h1 className="text-5xl font-bold">
              Newsify
            </h1>
            <p className="mt-8">Welcome! Let’s dive into your account!</p>
          </figcaption>
        </figure>
      </header>
      <main className="">
        <Unauthenticated>
          <div className="flex flex-col mx-auto my-8 gap-4">
            <Button variant={"outline"} className="outline-lime-500 mx-8 py-6 rounded-full" onClick={() => { signIn("facebook") }}>
              Continue with Faceboook
            </Button>
            <Button variant={"outline"} className="outline-lime-500 mx-8 py-6 rounded-full " onClick={() => { signIn("google") }}>
              Continue with Google
            </Button>

          </div>
          <HrWithText text="or" />
          <div className="flex flex-col text-center mt-8">
            <Button className="w-64 mx-auto rounded-full py-8">
              Sign in with Password
            </Button>
            <p className="mt-2">
              Don't have an acoount?
              <Button variant={"ghost"} className="hover:bg-transparent text-lime-600 hover:text-lime-500 px-2">Sign up</Button>
            </p>
          </div>


        </Unauthenticated>
      </main>
    </>
  )
}
