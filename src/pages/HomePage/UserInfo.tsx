import { useContext, useState } from "react"
import AppContext from "@/contexts/AppContext"
import { Button, Typography } from "antd"
import { logout } from "@/services/auth.service"
import { useNavigate } from "react-router-dom"

const UserInfo = () => {
	const navigate = useNavigate()
	const { user, setUser } = useContext(AppContext)
	const [isLoading, setIsLoading] = useState(false)

	const handleLogout = async () => {
		setIsLoading(true)
		try {
			await logout()
		} catch (error) {
			setIsLoading(false)
			console.error(error)
		} finally {
			window.localStorage.removeItem("token")
			window.localStorage.removeItem("user")
			setUser(null)
			navigate("/auth/login")
		}
	}

	return (
		<div>
			<Typography.Title level={4}>Bienvenido {user?.first_name}</Typography.Title>
			<Button onClick={handleLogout} loading={isLoading}>
				Cerrar sesión
			</Button>
		</div>
	)
}

export default UserInfo
