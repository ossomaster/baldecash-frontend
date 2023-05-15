import { useEffect, useState } from "react"
import { Button, Card, message } from "antd"
import UsersTable from "./UsersTable"
import { deleteOne, getAll } from "@/services/users.service"
import { User } from "@/types"
import useCan from "@/hooks/useCan"
import UserCreateModal from "./UserCreateModal"
import UserEditModal from "./UserEditModal"

export default function UsersCard() {
	const { can } = useCan()
	const [loadingView, setLoadingView] = useState(true)
	const [showModal, setShowModal] = useState({
		create: false,
		edit: false,
	})
	const [editingUser, setEditingUser] = useState<User | null>(null)
	const [users, setUsers] = useState<User[]>([])

	const handleToggleModal = (modal: keyof typeof showModal, nextState: boolean) => {
		setShowModal({
			...showModal,
			[modal]: nextState,
		})
	}

	const handleStoredUser = (user: User) => {
		setUsers([user, ...users])
		handleToggleModal("create", false)
	}

	const handleEditUser = (user: User) => {
		setEditingUser(user)
		handleToggleModal("edit", true)
	}

	const handleUpdatedUser = (nextUser: User) => {
		setUsers(
			users.map((user) => {
				if (user.id === nextUser.id) {
					return nextUser
				}
				return user
			})
		)
		handleToggleModal("edit", false)
	}

	const handleDeleteUser = async (user: User) => {
		try {
			await deleteOne(user.id)
			setUsers(users.filter((u) => u.id !== user.id))
			message.success(`Registro eliminado correctamente`)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getAll().then((response) => {
			setUsers(response.data.users)
			setLoadingView(false)
		})
	}, [])

	return (
		<Card
			title="Usuarios"
			loading={loadingView}
			extra={
				can("users:create") && (
					<Button type="primary" onClick={() => handleToggleModal("create", true)}>
						Nuevo usuario
					</Button>
				)
			}
		>
			{can("users:list") && <UsersTable records={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />}
			{can("users:create") && (
				<UserCreateModal
					show={showModal.create}
					onClose={() => handleToggleModal("create", false)}
					onSave={handleStoredUser}
				/>
			)}
			{can("users:edit") && editingUser && (
				<UserEditModal
					show={showModal.edit}
					user={editingUser}
					onClose={() => handleToggleModal("edit", false)}
					onSave={handleUpdatedUser}
				/>
			)}
		</Card>
	)
}
