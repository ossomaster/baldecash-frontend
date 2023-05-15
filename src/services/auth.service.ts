import httpClient from "@/lib/httpClient"
import { User } from "@/types"
import { AxiosPromise } from "axios"

type LoginFormData = {
	email: string
	password: string
}

type LoginResponse = {
	user: User
	access_token: string
	token_type: string
}

export const login = (fd: LoginFormData): AxiosPromise<LoginResponse> => httpClient.post("/auth/login", fd)
export const logout = () => httpClient.post("/auth/logout")
