import { Alert } from "antd"
import { isRouteErrorResponse, useRouteError } from "react-router-dom"

const ErrorPage = () => {
	const error = useRouteError()
	let errorElement = null

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			errorElement = <Alert description="Error 404 - Página o recurso no encontrado" type="error" />
		}

		if (error.status === 401) {
			errorElement = <Alert description="Error 401 - No autorizado" type="error" />
		}

		if (error.status === 503) {
			errorElement = <Alert description="Error 503 - Servicio no disponible" type="error" />
		}
	} else {
		errorElement = <Alert description="Error desconocido" type="error" />
	}

	return <div className="container">{errorElement}</div>
}

export default ErrorPage
