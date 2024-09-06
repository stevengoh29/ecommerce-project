import { createContext, useContext, useMemo, useRef } from "react"
import CustomBottomSheet from "../../components/bottom-sheet/bottom-sheet"

const CustomBottomSheetContext = createContext<BottomSheetHandler | undefined>(undefined)

export type ShowOption = {
    title: string
    message: string
}

export type BottomSheetHandler = {
    show: (option: ShowOption) => void
}

export const CustomBottomSheetProvider = ({ children }: any) => {
    const bottomSheet = useRef<BottomSheetHandler>(null)

    const action = useMemo(() => ({
        show(option: any) {
            if (bottomSheet.current) {
                bottomSheet.current.show(option)
            }
        }
    }), [])

    return (
        <CustomBottomSheetContext.Provider value={action}>
            {children}
            <CustomBottomSheet ref={bottomSheet} />
        </CustomBottomSheetContext.Provider>
    )
}

const useBottomSheet = () => {
    const context = useContext(CustomBottomSheetContext)
    if (context === undefined) {
        throw new Error("UseBottomSheet must be used within Provider");
    }

    return context
}

export default useBottomSheet