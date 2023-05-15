import { User } from "@/types"
import { createContext } from "react"

type AppContextType = {
	user: User | null
	setUser: (user: User | null) => void
}

const AppContext = createContext<AppContextType>({
	user: null,
	setUser: () => null,
})

export default AppContext
