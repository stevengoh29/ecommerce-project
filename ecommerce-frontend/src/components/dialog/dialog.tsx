import { Ref, forwardRef, useImperativeHandle, useMemo, useState } from "react"
import ConfirmDialog, { ConfirmationOption } from "./confirm-dialog"
import { useClickOutside } from "@/hooks/common/use-click-outside.hook"
import CustomDialog, { CustomOption } from "./custom-dialog"
import classNames from "classnames"

export type DialogHandler = {
    confirm: (option: ConfirmationOption) => void
    show: (option: CustomOption) => void
}

// export type CustomOption = {
//     onClose: () => void
// }

type DialogOption = {
    type: 'confirmation' | 'custom' | 'select'
    option: ConfirmationOption | CustomOption
    onClose: () => void
}

const Dialog = (props: any, ref: Ref<DialogHandler>) => {
    const [state, setState] = useState<DialogOption | undefined>()
    const onClose = () => setState(undefined)

    const dialogRef = useClickOutside(onClose)

    useImperativeHandle(ref, () => ({
        confirm: (option: ConfirmationOption) => {
            setState({ type: 'confirmation', onClose, option })
        },
        show: (option: CustomOption) => {
            setState({ type: 'custom', onClose, option })
        },
    }))

    const dialogContent = useMemo(() => {
        if (state?.type == 'confirmation') {
            const option = state.option as ConfirmationOption
            return <ConfirmDialog {...option} onClose={onClose} />
        }

        if (state?.type == 'custom') {
            const option = state.option as CustomOption
            return <CustomDialog {...option} onClose={onClose} />
        }
    }, [state, onClose])

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${state ? 'visible' : 'hidden'}`}>
            <div className={classNames((state?.option as CustomOption)?.containerClassName, `bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-scroll max-h-screen`)} ref={dialogRef}>
                {dialogContent}
            </div>
        </div>
    )
}

export default forwardRef(Dialog)