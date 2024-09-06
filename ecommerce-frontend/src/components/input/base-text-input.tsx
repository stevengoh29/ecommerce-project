import classNames from "classnames"
import { forwardRef, Ref } from "react"
import { IoClose } from "react-icons/io5"

type InputProps = React.ComponentProps<'input'>
type TextareaProps = React.ComponentProps<'textarea'>

type Props = {
    label: string
    multiline?: boolean
    hasError?: boolean
    type?: string
    isRequired?: boolean
    onReset: () => void
} & (InputProps | TextareaProps)

const BaseTextInput = (props: Props, ref: Ref<any>) => {
    const { className, label, onReset, multiline, hasError = false, isRequired, type = 'text', ...rest } = props
    return (
        <div className="flex-1 text-sm">
            <label>{label}{isRequired && <label className="text-red-500 font-black">*</label>}</label>
            <div className={`border rounded-md ${hasError ? 'border-red-500' : 'border-slate-200'} ${props.disabled ? 'bg-slate-200' : null}  px-5 py-2 flex flex-row items-center gap-5 w-full mt-1`}>
                {
                    multiline ?
                        <textarea ref={ref} {...(rest as TextareaProps)} className={`flex-1 outline-none ${props.disabled ? 'bg-slate-200' : null}`} />
                        :
                        <input ref={ref} type={type} {...(rest as InputProps)} className={`flex-1 outline-none ${props.disabled ? 'bg-slate-200' : null}`} />
                }
                {
                    !props.disabled || props.type == 'number' && <div onClick={onReset} className="w-5">
                        {props.value && <IoClose size={20} className={'cursor-pointer text-slate-400'} />}
                    </div>
                }
            </div>
        </div>
    )
}

export default forwardRef(BaseTextInput)