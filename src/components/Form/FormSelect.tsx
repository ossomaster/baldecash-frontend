import { Select, SelectProps } from "antd"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

type FormSelectProps<T extends FieldValues> = SelectProps & UseControllerProps<T>

const FormSelect = <T extends FieldValues>({ name, control, ...rest }: FormSelectProps<T>) => {
	const { field } = useController({
		name,
		control,
	})

	return (
		<Select
			style={{
				width: "100%",
			}}
			value={field.value}
			onChange={field.onChange}
			showSearch
			optionFilterProp="label"
			{...rest}
		/>
	)
}

export default FormSelect
