import axios from "axios"
import { message, notification } from "antd"

const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_HOST,
	headers: {
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
})

httpClient.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
		if (error.response) {
			const httpStatus = error.response.status
			const responseMessage = error.response.data?.message
			const responseErrors = error.response.data?.errors

			if (httpStatus == 422 && responseErrors) {
				const errors: string[][] = Object.values(responseErrors)
				const errorsMessage = errors.map((error) => error[0]).join(", ")
				notification.warning({
					message: responseMessage || "Algunos datos no son válidos",
					description: errorsMessage,
					placement: "top",
				})
				return Promise.reject(error)
			}

			if (httpStatus >= 400 && httpStatus <= 500 && responseMessage) {
				message.warning(responseMessage)
				return Promise.reject(error)
			}

			if (httpStatus >= 500 && responseMessage) {
				message.error(responseMessage)
				return Promise.reject(error)
			}

			message.error("Something went wrong. Please try again later.")
			return Promise.reject(error)
		}

		message.error("Something went wrong. Please try again later.")
		return Promise.reject(error)
	}
)

export const setAuthorizationHeader = (token: string | null) => {
	if (token) {
		httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
	} else {
		delete httpClient.defaults.headers.common["Authorization"]
	}
}

export default httpClient
