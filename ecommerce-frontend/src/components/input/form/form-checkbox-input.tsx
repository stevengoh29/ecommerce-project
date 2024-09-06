import { UseControllerProps, useController } from "react-hook-form"
import CheckboxInput from "../checkbox-input"

type Props = UseControllerProps<any> & {
    label: string
    checked?: boolean
}

const FormCheckboxInput = (props: Props) => {
    const { field } = useController(props)
    return <CheckboxInput label={props.label} checked={props.checked} {...field} />
}

export default FormCheckboxInput