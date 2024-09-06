import { UseControllerProps, useController } from "react-hook-form"
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import TimeInput from "../time-input";
import { HTMLInputTypeAttribute } from "react";
import DatetimeInput from "../datetime-input";


type Props = UseControllerProps<any> & {
    label: string
    type?: HTMLInputTypeAttribute
}

const FormDateTimePicker = (props: Props) => {
    const { field } = useController(props)
    return (
        <DatetimeInput label={props.label} type={props.type ?? 'datetime-local'}  {...field} />
    )
}

export default FormDateTimePicker