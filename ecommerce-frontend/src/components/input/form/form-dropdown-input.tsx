import { useController, UseControllerProps } from "react-hook-form"
import DropdownInput from "../dropdown-input"

type Props = UseControllerProps<any> & {
    label: string
    options: Option[]
}

type Option = {
    label: string
    value: string | number
}

const FormDropdownInput = (props: Props) => {
    const { field } = useController(props)

    return <DropdownInput
        field={field}
        label={props.label}
        options={props.options}
        value={props.options.find((opt) => { return field.value == opt.value })}
        onSelectedChanged={(option) => { field.onChange(option?.value) }}
    />
}

export default FormDropdownInput