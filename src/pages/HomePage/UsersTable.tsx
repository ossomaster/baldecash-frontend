import useCan from "@/hooks/useCan"
import { User } from "@/types"
import { Button, Popconfirm, Space, Table } from "antd"

type Props = {
	records: User[]
	onEdit: (user: User) => void
	onDelete: (user: User) => void
}

const UsersTable = ({ records, onEdit, onDelete }: Props) => {
	const { can } = useCan()

	const columns = [
		{
			title: "Nombres",
			dataIndex: "first_name",
		},
		{
			title: "Apellidos",
			dataIndex: "last_name",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Rol",
			dataIndex: "role",
		},
		{
			title: "Fecha de creación",
			dataIndex: "created_at",
			render: (date: string) => new Date(date).toLocaleString(),
		},
		{
			title: "Fecha de actualización",
			dataIndex: "updated_at",
			render: (date: string) => new Date(date).toLocaleString(),
		},
		{
			title: "Acciones",
			key: "actions",
			render: (_: unknown, record: User) => (
				<Space>
					{can("users:edit") && (
						<Button size="small" onClick={() => onEdit(record)}>
							Editar
						</Button>
					)}
					{can("users:delete") && (
						<Popconfirm
							title="Confirmar acción"
							description="¿Estás seguro de eliminar este registro?"
							okText="Eliminar"
							okButtonProps={{ danger: true }}
							onConfirm={() => onDelete(record)}
						>
							<Button size="small" danger>
								Eliminar
							</Button>
						</Popconfirm>
					)}
				</Space>
			),
		},
	]
	return <Table dataSource={records} columns={columns} rowKey="id" />
}

export default UsersTable
