import { useContext } from "react"
import AppContext from "@/contexts/AppContext"
import { Navigate } from "react-router-dom"

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
	const { user } = useContext(AppContext)
    
	return !user ? <Navigate to="/auth/login" /> : children
}

export default ProtectRoute
