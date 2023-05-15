import ReactDOM from "react-dom/client"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { setAuthorizationHeader } from "./lib/httpClient"

import HomePage from "./pages/HomePage/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import MainLayout from "./layouts/MainLayout"
import ProtectRoute from "./components/ProtectRoute"
import GuestRoute from "./components/GuestRoute"
import ErrorPage from "./pages/ErrorPage"

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: (
					<ProtectRoute>
						<HomePage />
					</ProtectRoute>
				),
			},
			{
				path: "/auth/login",
				element: (
					<GuestRoute>
						<LoginPage />
					</GuestRoute>
				),
			},
		],
	},
])

setAuthorizationHeader(window.localStorage.getItem("token"))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<RouterProvider router={router} />)
