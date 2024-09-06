import { createContext, useContext, useMemo, useRef } from "react"
import Dialog, { DialogHandler } from "../../components/dialog/dialog"

const DialogContext = createContext<DialogHandler | undefined>(undefined)

export const DialogProvider = ({ children }: any) => {
    const dialog = useRef<DialogHandler>(null)

    const action = useMemo(() => ({
        confirm(option: any) {
            if (dialog.current) {
                dialog.current.confirm(option)
            }
        },
        show(option: any) {
            if (dialog.current) {
                dialog.current.show(option)
            }
        }
    }), [dialog])

    return (
        <>
            <DialogContext.Provider value={action}>
                {children}
            </DialogContext.Provider>
            <Dialog ref={dialog} />
        </>
    )
}

const useDialog = () => {
    const context = useContext(DialogContext)
    if (context === undefined) {
        throw new Error("UseDialog must be used within DialogProvider");
    }

    return context
}

export default useDialog