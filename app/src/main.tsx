import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '$style/index.scss'
import App from './pages/Homepage.tsx'
import { SettingsProvider } from './context/settingsContext.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './layout.tsx'
import { Fallback } from '@/components/fallback.tsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    hydrateFallbackElement: <Fallback/>,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/',
            element: <App />,
            loader: async () => 
              new Promise((resolve) => { setTimeout(() => {
                resolve(null)
              }, 1000) }),
          },
        ]
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  </StrictMode>,
)
