import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import Avatar from "../../components/avatar/avatar";
import ProductCard from "../../components/card/product-card";
import AppHeader from "../../components/content/app-header";
import SearchInput from "../../components/input/search-input";
import Heading from "../../components/text/heading";
import { TW_COLOR } from "../../core/color/tailwind-palette.color";
import { RootStackParamList } from "../../core/types/navigation.type";
import { useSubCategories } from "../../hooks/category/use-sub-category.hook";
import useDebounceValue from "../../hooks/common/use-debounce-value.hook";
import { SubCategory } from "../../services/category/category.type";

const ShopByCategory = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'SHOP_BY_CATEGORY'>>()
    const mainCategoryId = route.params.categoryId

    const { subCategories, isLoading, refetch } = useSubCategories(mainCategoryId)
    const [refreshing] = useState(false)

    const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | undefined>()

    // Temporary search Input
    const [searchInput, setSearchInput] = useState<string>('')
    // Search Text to be used for query
    const [searchText, setSearchText] = useState<string>('')
    const { debouncedValue } = useDebounceValue(searchInput, 1000)

    const onSelectSubcategory = (subcategory: SubCategory) => {
        selectedSubcategory?.uuid == subcategory.uuid ? setSelectedSubcategory(undefined) : setSelectedSubcategory(subcategory)
        setSearchInput('')
    }

    const onSearchInputTextChanged = (text: string) => setSearchInput(text)

    const onDebounceValueChange = (text: string) => setSearchText(text)

    useEffect(() => {
        onDebounceValueChange(debouncedValue)
    }, [debouncedValue])

    return (
        <View style={styles.container}>
            <AppHeader title={route.params.categoryName} showBackButton />
            <View style={styles.content}>
                <FlatList
                    refreshing={refreshing}
                    onRefresh={refetch}
                    ListHeaderComponent={
                        <View style={{ marginBottom: 8 }}>
                            <SearchInput containerStyle={{ padding: 4 }} value={searchInput} onTextChanged={(text) => onSearchInputTextChanged(text)} />
                            <View style={{ marginVertical: 8 }}>
                                {isLoading ? <ActivityIndicator animating /> : (
                                    <FlatList
                                        style={{ marginVertical: 8 }}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                        data={subCategories}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <Avatar
                                                    key={index}
                                                    imageSource={require('../../../assets/icon.png')}
                                                    isSelected={item.uuid == selectedSubcategory?.uuid}
                                                    label={item.name}
                                                    onPress={() => onSelectSubcategory(item)}
                                                    containerStyle={{ marginRight: 14 }}
                                                />
                                            )
                                        }}
                                    />
                                )}
                            </View>
                            <Heading>Showing Products</Heading>
                            {selectedSubcategory && <Text>Subcategory: {selectedSubcategory.name}</Text>}
                            {searchText != '' && <Text>Search: {searchText}</Text>}
                        </View>
                    }
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }}
                    data={Array.from({ length: 10 })}
                    numColumns={2}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return <ProductCard key={index} />
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TW_COLOR.white
    },
    content: {
        paddingHorizontal: 16,
        flex: 1
    }
})

export default ShopByCategory