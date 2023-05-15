import { AxiosPromise } from "axios"
import { User } from "@/types"
import httpClient from "@/lib/httpClient"

export const getAll = (): AxiosPromise<{ users: User[] }> => httpClient.get("/users")

export type UserFormData = Omit<User, "id" | "created_at" | "updated_at"> & {
	password: string
	password_confirmation: string
}

export const store = (fd: UserFormData) => httpClient.post("/users", fd)
export const update = (id: number, fd: UserFormData) => httpClient.put(`/users/${id}`, fd)
export const deleteOne = (id: number) => httpClient.delete(`/users/${id}`)
