/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { SettingsProvider } from "./context/settingsContext";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { createBrowserRouter, RouterProvider } from "react-router"
import AuthPage from "./pages/auth"

// @ts-ignore
const convex = new ConvexReactClient(process.env.BUN_PUBLIC_CONVEX_URL);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />
  }
])

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </ConvexAuthProvider>
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
