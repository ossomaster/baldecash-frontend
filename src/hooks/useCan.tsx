import AppContext from "@/contexts/AppContext"
import { useCallback, useContext } from "react"
const useCan = () => {
	const { user } = useContext(AppContext)

	const can = useCallback(
		(permission: string) => {
			if (!user) return false

			if (user.role === "ADMINISTRADOR") return true

			if (user.role === "REVISOR") {
				const permissions = ["users:list"]

				return permissions.includes(permission)
			}
		},
		[user]
	)

	return { can }
}

export default useCan
