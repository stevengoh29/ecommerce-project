import Button from "../button/button"

export type ConfirmationOption = {
    title?: string
    message: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void
    onCancel?: () => void
}

type Props = ConfirmationOption & {
    onClose: () => void
}

const ConfirmDialog = (props: Props) => {
    const { title = 'Confirmation', message = 'Are you sure?', cancelLabel = 'No', confirmLabel = 'Yes', onConfirm, onCancel, onClose } = props

    const onConfirmButtonClick = () => {
        onConfirm()
        onClose()
    }

    return (
        <div className="bg-white rounded-lg shadow-lg w-full p-6 overflow-scroll max-h-screen">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <div className="mt-3">{message}</div>
            <div className="mt-6 flex justify-end gap-3">
                <Button label={cancelLabel} variant='danger' onClick={onCancel ?? onClose} />
                <Button label={confirmLabel} onClick={onConfirmButtonClick} />
            </div>
        </div>

    )
}

export default ConfirmDialog