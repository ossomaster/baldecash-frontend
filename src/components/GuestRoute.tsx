import { useContext } from "react"
import AppContext from "@/contexts/AppContext"
import { Navigate } from "react-router-dom"

const GuestRoute = ({ children }: { children: JSX.Element }) => {
	const { user } = useContext(AppContext)

	return user ? <Navigate to="/" /> : children
}

export default GuestRoute
