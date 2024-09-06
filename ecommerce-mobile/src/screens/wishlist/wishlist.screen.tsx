import { Text, View } from "react-native"
import Button from "../../components/button/button"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import useBottomSheet from "../../hooks/common/use-bottom-sheet.hook"

const WishlistScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const bottomSheet = useBottomSheet()

    const showBottomSheet = () => {
        bottomSheet.show({
            message: "wowiadjaw",
            title: "sjads"
        })
    }

    return (
        <View>
            <Text>Hello from Wishlist Screen</Text>
            <Button children='Go To Other Screen' onPress={showBottomSheet} />
        </View>
    )
}

export default WishlistScreen