import { Controller, ControllerProps, ControllerRenderProps, UseControllerProps, set, useController } from "react-hook-form"
import ImageFileUpload from "../image-file-upload"
import { ChangeEvent, useState } from "react"
import { IoClose } from "react-icons/io5"

type Props = Omit<ControllerProps<any>, 'render'> & {
    preview?: File[]
    multiple?: boolean
}

const FormMultipleImageUpload = (props: Props) => {
    const [preview, setPreview] = useState<File[]>(props.preview ?? [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps) => {
        if (e.target.files) {
            setPreview([...preview, e.target.files[0]])
            field.onChange([...preview, e.target.files[0]])
        }
    }

    const handleRemoveImage = (field: ControllerRenderProps, indexNumber?: number) => {
        const newPreview = preview.filter((prev, index) => index != indexNumber)
        setPreview(newPreview)
        field.onChange(newPreview)
    }

    const renderComponent = (field: ControllerRenderProps) => {
        if (preview.length > 0) {
            return (
                <div className="flex gap-5">
                    {preview.map((imagePreview, index) => {
                        return (
                            <div key={index}>
                                <div className="relative w-20 h-20" >
                                    {!props.disabled && <IoClose size={20} color="white" className="absolute -right-2 -top-2 bg-red-500 rounded-full cursor-pointer hover:bg-red-700 duration-300" onClick={() => handleRemoveImage(field, index)} />}
                                    <img className="w-full h-full" src={URL.createObjectURL(imagePreview)} />
                                </div>

                            </div>
                        )
                    })}
                    <ImageFileUpload {...field} onChange={(e) => handleChange(e, field)} />
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

export default FormMultipleImageUpload