import { useController, UseControllerProps } from 'react-hook-form'
import BaseTextInput from '../base-text-input'

type Props = UseControllerProps<any> & {
    label: string
    multiline?: boolean
    isRequired?: boolean
    type?: string
}

const FormTextInput = (props: Props) => {
    const { field, fieldState } = useController(props)
    const { multiline = false, isRequired = false, type } = props

    return (
        <div className='flex-1 w-full'>
            <BaseTextInput
                isRequired={isRequired}
                multiline={multiline}
                hasError={fieldState.invalid}
                label={props.label}
                type={props.type}
                onReset={() => { field.onChange(undefined) }}
                {...field}
                placeholder={props.label}
            />
            {fieldState.error && <p className='text-red-500 font-bold px-5 mt-1 text-sm'>{fieldState.error.message}</p>}
        </div>
    )
}

export default FormTextInput