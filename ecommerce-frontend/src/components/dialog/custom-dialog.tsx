import React, { ReactNode } from "react"
import Button from "../button/button"

export type CustomOption = {
    title?: string
    containerClassName?: string
    renderItem: (args?: any) => ReactNode
}

type Props = CustomOption & {
    onClose: () => void
}

const CustomDialog = (props: Props) => {
    const { title = 'Confirmation', renderItem, onClose } = props

    return (
        <>
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <div>
                {renderItem(onClose)}
            </div>
        </>

    )
}

export default CustomDialog