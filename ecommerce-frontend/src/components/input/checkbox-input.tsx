import { forwardRef } from "react"

type Props = React.ComponentProps<'input'> & {
    label: string
}

const CheckboxInput = (props: Props, ref: any) => {
    return (
        <div className="flex items-center gap-3">
            <input ref={ref} id={props.label} type="checkbox" {...props} readOnly={props.disabled} className="w-4 h-4" />
            <label htmlFor={props.label}>{props.label}</label>
        </div>
    )
}

export default forwardRef(CheckboxInput)