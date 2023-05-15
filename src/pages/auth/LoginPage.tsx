import { useState, useContext } from "react"
import FormInput from "@/components/Form/FormInput"
import { login } from "@/services/auth.service"
import { Button, Card, Form, Typography } from "antd"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { setAuthorizationHeader } from "@/lib/httpClient"
import AppContext from "@/contexts/AppContext"

type FormValues = {
	email: string
	password: string
}

const LoginPage = () => {
	const { setUser } = useContext(AppContext)
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const { handleSubmit, control } = useForm<FormValues>()

	const onValid = async (data: FormValues) => {
		setIsLoading(true)

		try {
			const response = await login(data)
			window.localStorage.setItem("user", JSON.stringify(response.data.user))
			window.localStorage.setItem("token", response.data.access_token)
			setAuthorizationHeader(response.data.access_token)
			setUser(response.data.user)
			navigate("/", { replace: true })
		} catch (error) {
			console.error(error)
			setIsLoading(false)
		}
	}

	return (
		<div className="container">
			<Card>
				<Typography.Title level={3}>Login</Typography.Title>
				<form onSubmit={handleSubmit(onValid)}>
					<Form.Item>
						<label htmlFor="email">Email</label>
						<FormInput required type="email" id="email" name="email" control={control} />
					</Form.Item>
					<Form.Item>
						<label htmlFor="password">Contraseña</label>
						<FormInput required type="password" id="password" name="password" control={control} />
					</Form.Item>
					<Button type="primary" htmlType="submit" loading={isLoading}>
						Iniciar sesión
					</Button>
				</form>
			</Card>
		</div>
	)
}

export default LoginPage
