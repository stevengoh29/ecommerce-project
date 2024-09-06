import { Text, View } from "react-native"
import Button from "../../components/button/button"
import { NavigationProp, useNavigation } from "@react-navigation/native"

const TransactionScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>()

    return (
        <View>
            <Text>Hello from Transaction Screen</Text>
            <Button children='Go To Other Screen' />
        </View>
    )
}

export default TransactionScreen