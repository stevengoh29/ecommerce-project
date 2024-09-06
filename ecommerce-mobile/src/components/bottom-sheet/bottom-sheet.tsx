import { Text, StyleSheet, Button } from "react-native"
import { Ref, forwardRef, useCallback, useMemo, useRef, useImperativeHandle, useState } from "react"
import BottomSheet, { BottomSheetModal, BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import { BottomSheetHandler, ShowOption } from "../../hooks/common/use-bottom-sheet.hook";

const CustomBottomSheet = (_: any, ref: Ref<BottomSheetHandler>) => {
    const [state, setState] = useState<ShowOption | undefined>()
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const onClose = () => {
        bottomSheetModalRef.current?.close()
        setState(undefined)
    }

    useImperativeHandle(ref, () => ({
        show: (option: ShowOption) => {
            setState(option)
            bottomSheetModalRef.current?.present()
        }
    }))

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <BottomSheetView style={styles.contentContainer}>
                {state &&
                    <>
                        <Text>{state.title}</Text>
                        <Text>{state.message}</Text>
                        <Button title="Close" onPress={onClose} />
                    </>
                }
            </BottomSheetView>
        </BottomSheetModal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default forwardRef(CustomBottomSheet)