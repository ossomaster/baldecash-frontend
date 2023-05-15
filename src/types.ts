export interface User {
	id: number
	first_name: string
	last_name: string
	email: string
	role: "ADMINISTRADOR" | "REVISOR"
	created_at: string
	updated_at: string
}
