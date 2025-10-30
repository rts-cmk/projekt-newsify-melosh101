import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APITester } from "./APITester";
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import useSettings from "./hooks/useSettings";
import { api } from "convex/_generated/api";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";

export function App() {
  const user = useQuery(api.user.currentUser);
  const settings = useSettings();
  const {signIn, signOut} = useAuthActions();
  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
        />
      </div>
      <Card>
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
          <CardDescription>
            Edit <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">src/App.tsx</code> and save to
            test HMR
          </CardDescription>
        </CardHeader>
        <CardContent>
          <APITester />
        </CardContent>
      </Card>

      <div className="mt-8 text-sm text-muted-foreground">
        <Authenticated>
          <p>Signed in as {user?.email}</p>
          <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </Authenticated>
        <Unauthenticated>
          <p>not singed in</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => signIn("google")}
          >
            Sign In with Google
          </button>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => signIn("facebook")}
          >
            Sign In with Facebook
          </button>
        </Unauthenticated>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Current Theme: {settings.settings.theme}</p>
        <p>Shown Onboarding: {settings.settings.shownOnbarding ? "Yes" : "No"}</p>
        <p>Archive Items: {settings.settings.archive.length}</p>
      </div>
    </div>
  );
}

export default App;
