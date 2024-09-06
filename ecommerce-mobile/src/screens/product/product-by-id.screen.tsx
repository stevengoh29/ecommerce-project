import { Dimensions, Image, ScrollView, StyleSheet, Pressable, View } from "react-native"
import { useState } from 'react'
import Text from "../../components/text/text"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../core/types/navigation.type"
import AppHeader from "../../components/content/app-header"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import Heading from "../../components/text/heading"
import { ProductLabel } from "../../components/card/product-card"
import { Ionicons } from "@expo/vector-icons"
import Button from "../../components/button/button"
import Chip from "../../components/chip/chip"

const ProductById = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'PRODUCT_BY_ID'>>()
    const width = Dimensions.get('screen').width

    const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | undefined>()

    const onSelectVariant = (index: number) => {
        setSelectedVariantIndex(index != selectedVariantIndex ? index : undefined)
    }

    return (
        <View style={styles.container}>
            <AppHeader
                showBackButton
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={require('../../../assets/icon.png')}
                    resizeMode="contain"
                    style={{ width, height: width / 1.2, backgroundColor: TW_COLOR.gray[300] }}
                />

                <View style={styles.content}>
                    <Heading numberOfLines={2}>$99.99</Heading>
                    <Heading numberOfLines={2}>Oversized Printed Fit Meshed T-Shirt</Heading>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Ionicons name="star" color={TW_COLOR.yellow[300]} size={16} />
                        <Text style={styles.productLabelText}>4.5 (195)</Text>
                    </View>
                    <View style={{ backgroundColor: TW_COLOR.gray[300], height: 64, marginVertical: 8, borderRadius: 4 }}>

                    </View>
                </View>

                <View style={[styles.content, { marginTop: 10, paddingRight: 0 }]}>
                    <Text>5 variants</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexDirection: 'row', gap: 8, marginVertical: 8 }}
                    >
                        {Array.from({ length: 5 }).map((item, index) => {
                            return <Chip key={index} isSelected={selectedVariantIndex == index} onPress={() => onSelectVariant(index)} />
                        })}
                    </ScrollView>
                </View>


                <Pressable style={[styles.content, { marginTop: 10 }]} onPress={() => alert('oi')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Product Description</Text>
                        <Ionicons name="chevron-forward" size={18} color={TW_COLOR.gray[400]} />
                    </View>
                    <View style={{ marginVertical: 8 }}>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officia nesciunt error vitae atque ut. Reiciendis vel debitis repellendus officia nihil voluptatum necessitatibus, esse nulla aliquam accusamus eveniet perspiciatis iure!</Text>
                    </View>
                </Pressable>

                <Pressable style={[styles.content, { marginTop: 10 }]}>
                    <View
                        style={{ flexDirection: 'row', gap: 8, marginVertical: 8, alignItems: 'center' }}
                    >
                        <Image
                            source={require('../../../assets/icon.png')}
                            style={{ width: 64, height: 64, borderRadius: 50 }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontFamily: 'Inter-Bold' }}>Abeng Official Store</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <Ionicons name="star" color={TW_COLOR.yellow[300]} size={16} />
                                <Text style={styles.productLabelText}>4.5 (195)</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={TW_COLOR.gray[400]} />
                    </View>
                </Pressable>

                <View style={[styles.content, { marginTop: 10 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Comment and Reviews</Text>
                        <Ionicons name="chevron-forward" size={18} color={TW_COLOR.gray[400]} />
                    </View>
                    <View style={{ marginVertical: 8, height: 100, backgroundColor: TW_COLOR.gray[300], borderRadius: 4 }}>

                    </View>
                    <View style={{ marginVertical: 8, height: 100, backgroundColor: TW_COLOR.gray[300], borderRadius: 4 }}>

                    </View>
                </View>

                <View style={[styles.content, { marginVertical: 10 }]}>
                    <Text>More Products from this store</Text>
                    <View style={{ marginVertical: 8, height: 100, backgroundColor: TW_COLOR.gray[300], borderRadius: 4 }}>

                    </View>

                    <Text>Recommended product for you</Text>
                    <View style={{ marginVertical: 8, height: 100, backgroundColor: TW_COLOR.gray[300], borderRadius: 4 }}>

                    </View>
                </View>
            </ScrollView>
            <View style={styles.actionContainer}>
                <Button children='Buy Now' style={{ flex: 1 }} />
                <Button children='Add to wishlist' style={{ flex: 1 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: TW_COLOR.white
    },
    content: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    productLabelText: {
        fontSize: 14,
        color: TW_COLOR.gray[500]
    },
    actionContainer: {
        backgroundColor: TW_COLOR.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderTopWidth: 1,
        // borderTopColor: TW_COLOR.gray[300],
        gap: 20
    }
})

export default ProductById