import { Ref, forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react"
import { Modal, View } from "react-native"
import ConfirmDialog, { ConfirmationOption } from "./confirm-dialog"
import SelectDialog, { SelectOption } from "./select-dialog"

export type DialogHandler = {
    confirm: (option: ConfirmationOption) => void
    select: (option: SelectOption) => void
}

export type CustomOption = {
    onClose: () => void
}

type DialogOption = {
    type: 'confirmation' | 'custom' | 'select'
    option: ConfirmationOption | CustomOption | SelectOption
    onClose: () => void
}

const Dialog = (_: any, ref: Ref<DialogHandler>) => {
    const [state, setState] = useState<DialogOption | undefined>()

    const onClose = useCallback(() => {
        setState(undefined)
    }, [setState])

    // Expose Method instead of component
    useImperativeHandle(ref, () => ({
        confirm: (option: ConfirmationOption) => {
            setState({ type: 'confirmation', option, onClose })
        },
        select: (option: SelectOption) => {
            setState({ type: 'select', option, onClose })
        }
    }))

    const dialogContent = useMemo(() => {
        if (state) {
            console.log(state)
            if (state.type == 'confirmation') {
                const option = state.option as ConfirmationOption
                return <ConfirmDialog onClose={onClose} {...option} />
            }

            if (state.type == 'select') {
                const option = state.option as SelectOption
                return <SelectDialog onClose={onClose} {...option} />
            }

            // TODO: Add other state type
        }
    }, [state, onClose])

    return (
        <Modal
            visible={state != undefined}
            transparent
        >
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
                {dialogContent}
            </View>

        </Modal>
    )
}

export default forwardRef(Dialog)