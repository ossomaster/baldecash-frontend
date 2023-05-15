import FormInput from "@/components/Form/FormInput"
import FormSelect from "@/components/Form/FormSelect"
import { ROLES } from "@/constants"
import { UserFormData, store, update } from "@/services/users.service"
import { User } from "@/types"
import { Button, Form, Modal, message } from "antd"
import { useState } from "react"
import { useForm } from "react-hook-form"

type UserCreateModalProps = {
	show: boolean
	onClose: () => void
	user: User
	onSave: (user: User) => void
}

type FormValues = UserFormData

const UserEditModal = ({ show, onClose, user, onSave }: UserCreateModalProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const { handleSubmit, control } = useForm<FormValues>({
		defaultValues: { ...user },
	})

	const onValid = async (data: FormValues) => {
		setIsLoading(true)

		try {
			const response = await update(user.id, data)
			onSave(response.data.user)
			message.success("Registro actualizado correctamente")
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Modal title={`Editar usuario: ${user.email}`} open={show} onOk={onClose} onCancel={onClose} footer={false}>
			<form onSubmit={handleSubmit(onValid)}>
				<Form.Item>
					<label htmlFor="first_name">Nombres</label>
					<FormInput required type="text" id="first_name" name="first_name" control={control} />
				</Form.Item>
				<Form.Item>
					<label htmlFor="last_name">Apellidos</label>
					<FormInput required type="text" id="last_name" name="last_name" control={control} />
				</Form.Item>
				<Form.Item>
					<label htmlFor="email">Email</label>
					<FormInput required type="email" id="email" name="email" control={control} />
				</Form.Item>
				<Form.Item>
					<label htmlFor="password">Contraseña</label>
					<FormInput type="password" id="password" name="password" control={control} />
				</Form.Item>
				<Form.Item>
					<label htmlFor="password_confirmation">Confirmar Contraseña</label>
					<FormInput type="password" id="password_confirmation" name="password_confirmation" control={control} />
				</Form.Item>
				<Form.Item>
					<label htmlFor="role">Rol</label>
					<FormSelect
						id="role"
						name="role"
						control={control}
						options={ROLES.map((role) => ({
							label: role,
							value: role,
						}))}
					/>
				</Form.Item>
				<Button type="primary" htmlType="submit" loading={isLoading}>
					Guardar
				</Button>
			</form>
		</Modal>
	)
}

export default UserEditModal
