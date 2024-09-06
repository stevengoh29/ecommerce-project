import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useState } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import ProductCard from "../../components/card/product-card"
import AppHeader from "../../components/content/app-header"
import SectionHeader from "../../components/content/section-header"
import Text from "../../components/text/text"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import { RootStackParamList } from "../../core/types/navigation.type"
import { useGetMainCategories } from "../../hooks/category/use-main-category.hook"
import Avatar from "../../components/avatar/avatar"
import { FetchType } from "../../services/category/main-category.service"

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const { mainCategories, isLoading, refetch } = useGetMainCategories(FetchType.TOP5)
    const [refreshing] = useState(false)

    const navigateToCategoryListing = () => navigation.navigate('CATEGORY_LISTING')

    const navigateToShopByCategory = (categoryId: string, categoryName: string) => {
        navigation.navigate('SHOP_BY_CATEGORY', {
            categoryId,
            categoryName
        })
    }

    return (
        <View style={styles.container}>
            <AppHeader type='SHOW_APP_BAR' />
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetch} />}>
                <View style={styles.dummyBanner}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>This will be a banner</Text>
                </View>
                <View style={styles.contentContainer}>
                    <SectionHeader
                        title="Shop by Category"
                        buttonSeeAll
                        style={{ marginBottom: 16 }}
                        onButtonSeeAllPress={navigateToCategoryListing}
                    />

                    <View style={styles.categoryContainer}>
                        {isLoading ? <ActivityIndicator color={TW_COLOR.blue[500]} size={22} /> : (
                            mainCategories?.map((mainCategory, index) => {
                                return <Avatar
                                    key={index}
                                    onPress={() => navigateToShopByCategory(mainCategory.uuid, mainCategory.name)}
                                    imageSource={require('../../../assets/icon.png')}
                                    label={mainCategory.name}
                                />
                            })
                        )}
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <SectionHeader
                        title="Product you looked before"
                        buttonSeeAll
                        style={{ marginBottom: 8 }}
                    />
                    <View style={styles.productContainer}>
                        <View style={styles.productContainer}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={Array.from({ length: 3 })}
                                contentContainerStyle={{ gap: 10 }}
                                renderItem={() => {
                                    return <ProductCard />
                                }}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <SectionHeader
                        title="Recommended for you"
                        buttonSeeAll
                        style={{ marginBottom: 8 }}
                    />
                    <View style={styles.productContainer}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={Array.from({ length: 3 })}
                            contentContainerStyle={{ gap: 10 }}
                            renderItem={() => {
                                return <ProductCard />
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TW_COLOR.white
    },
    dummyBanner: {
        height: 160,
        backgroundColor: TW_COLOR.gray[300],
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryContainer: {
        marginBottom: 16,
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    contentContainer: {
        paddingHorizontal: 16,
        marginBottom: 20
    },
    historyContainer: {
        paddingHorizontal: 16,
        marginVertical: 20,
        flexDirection: 'row',
        gap: 8
    },
    productContainer: {
        marginBottom: 8,
        flexDirection: 'row',
    }
})

export default HomeScreen