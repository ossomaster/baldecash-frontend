import { Input, InputProps } from "antd"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

type FormInputProps<T extends FieldValues> = InputProps & UseControllerProps<T>

const FormInput = <T extends FieldValues>({ name, control, ...rest }: FormInputProps<T>) => {
	const { field } = useController({
		name,
		control,
	})

	return <Input value={field.value} onChange={field.onChange} {...rest} />
}

export default FormInput
