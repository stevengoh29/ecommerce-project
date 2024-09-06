import { ComponentProps, forwardRef, Ref } from "react"

type Props = ComponentProps<'input'> & {
    label: string
}

const DateTimeInput = (props: Props, ref: Ref<HTMLInputElement>) => {
    const { label, disabled, type, ...rest } = props
    return (
        <div className="relative flex-1">
            <label className="text-sm">{label}</label>
            <div className={`border rounded-md px-5 py-[6px] flex flex-row items-center gap-5 w-full mt-1 ${disabled ? 'bg-slate-200' : null}`}>
                <input ref={ref} type={type} disabled={disabled} {...rest} className={`flex-1 outline-none ${disabled ? 'bg-slate-200' : null}`} />
            </div>
        </div>
    )
}

export default forwardRef(DateTimeInput)