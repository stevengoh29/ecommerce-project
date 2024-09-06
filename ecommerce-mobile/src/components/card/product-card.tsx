import { View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import { Ionicons } from "@expo/vector-icons"
import Text from "../text/text"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../core/types/navigation.type"

export const ProductLabel = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.productLabelText}>Hello</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="star" color={TW_COLOR.yellow[300]} size={14} />
                <Text style={styles.productLabelText}>4.5 (195)</Text>
            </View>
        </View>
    )
}

const ProductCard = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList, 'BOTTOM_TAB'>>()

    const navigateToProductById = () => {
        navigation.navigate('PRODUCT_BY_ID', { productId: '01234567890' })
    }

    return (
        <TouchableOpacity onPress={navigateToProductById} style={{ width: 170 }}>
            <Image
                source={require('../../../assets/icon.png')}
                style={{ height: 200, width: 170, backgroundColor: TW_COLOR.gray[400] }}
                resizeMode="contain"
            />
            <ProductLabel />
            <Text numberOfLines={1} style={{ fontSize: 14, fontFamily: 'Inter-SemiBold' }}>Oversized Printed Fit Meshed T-Shirt</Text>
            <Text numberOfLines={1} style={{ fontSize: 16, marginTop: 4, fontFamily: 'Inter-Bold' }}>$99.99</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    productLabelText: {
        fontSize: 12,
        color: TW_COLOR.gray[500]
    }
})

export default ProductCard