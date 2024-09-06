import { ChangeEvent, forwardRef, useState } from "react"
import { UseControllerProps, useController } from "react-hook-form"
import { IoAdd } from "react-icons/io5"

type Props = React.ComponentProps<'input'> & {
    // onChange: (e: FileList | null) => void
    // field: UseControllerProps<any>
}

const ImageFileUpload = (props: Props, ref: React.Ref<any>) => {
    const { value, ...rest } = props

    return (
        <label className="flex w-20 h-20 text-center text-white border border-dashed border-slate-300 rounded cursor-pointer shadow-main justify-center items-center">
            <IoAdd color="black" size={24} />
            <input
                {...rest}
                type="file"
                className="hidden"
            />
        </label>
    )
}

export default forwardRef(ImageFileUpload)