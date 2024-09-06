import { Text, View, StyleSheet, Button } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import BottomSheet from "../../components/bottom-sheet/bottom-sheet"
import { useCallback, useMemo, useRef } from "react"
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import useBottomSheet from "../../hooks/common/use-bottom-sheet.hook"

const ProductScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const test = useBottomSheet()

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        test.show({
            message: "Hello",
            title: "Title"
        })
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Text>Hello from Product Screen</Text>
            {/* <Button children='Go To Other Screen' /> */}
            <Button
                onPress={handlePresentModalPress}
                title="Present Modal"
                color="black"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});


export default ProductScreen