import { UseControllerProps, useController } from "react-hook-form"
import DropdownInput from "../dropdown-input"
import MultiselectInput from "../multiselect-input"

type Props = UseControllerProps<any> & {
    label: string
    options: Option[]
}

type Option = {
    label: string
    value: string | number
}

const FormMultiselectInput = (props: Props) => {
    const { field } = useController(props)
    return (
        <MultiselectInput
            label={props.label}
            options={props.options}
            value={props.options.filter(opt => field.value?.includes(opt.value))}
            onSelectedChanged={(options) => field.onChange(options?.map((option) => option.value))}
        />
    )
}

export default FormMultiselectInput