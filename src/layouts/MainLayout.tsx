import AppContext from "@/contexts/AppContext"
import { User } from "@/types"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const user = window.localStorage.getItem("user")
		if (user) {
			setUser(JSON.parse(user))
		}
	}, [])

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			<div className="container">
				<Outlet />
			</div>
		</AppContext.Provider>
	)
}

export default MainLayout
