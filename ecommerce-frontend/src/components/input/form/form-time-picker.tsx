import { UseControllerProps, useController } from "react-hook-form"
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import TimeInput from "../time-input";


type Props = UseControllerProps<any> & {
    label: string
}

const FormTimePicker = (props: Props) => {
    const { field } = useController(props)
    return (
        <TimeInput label={props.label} {...field} />
    )
}

export default FormTimePicker