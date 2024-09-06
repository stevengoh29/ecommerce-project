import { Controller, ControllerProps, ControllerRenderProps, UseControllerProps, set, useController } from "react-hook-form"
import ImageFileUpload from "../image-file-upload"
import { ChangeEvent, useState } from "react"
import { IoClose } from "react-icons/io5"

type Props = Omit<ControllerProps<any>, 'render'> & {
    preview?: File | undefined
}

const FormImageUpload = (props: Props) => {
    const [preview, setPreview] = useState<File | null | undefined>(props.preview ?? null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps) => {
        if (e.target.files) {
            setPreview(e.target.files[0])
            field.onChange(e.target.files[0])
        }
    }

    const handleRemoveImage = (field: ControllerRenderProps) => {
        setPreview(undefined)
        field.onChange(undefined)
    }

    const renderComponent = (field: ControllerRenderProps) => {
        if (preview) {
            return (
                <div className="relative w-20 h-20" >
                    {!props.disabled && <IoClose size={20} color="white" className="absolute -right-2 -top-2 bg-red-500 rounded-full cursor-pointer hover:bg-red-700 duration-300" onClick={() => handleRemoveImage(field)} />}
                    <img className="w-full h-full" src={URL.createObjectURL(preview)} />
                </div>
            )
        }

        return <ImageFileUpload {...field} onChange={(e) => handleChange(e, field)} />
    }

    return <Controller
        {...props}
        render={({ field }) => renderComponent(field)}
    />
}

export default FormImageUpload