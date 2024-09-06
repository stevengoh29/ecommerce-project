import { View, Text, FlatList, ActivityIndicator } from "react-native";
import AppHeader from "../../components/content/app-header";
import CategoryCard from "../../components/card/category-card";
import { TW_COLOR } from "../../core/color/tailwind-palette.color";
import { useGetMainCategories } from "../../hooks/category/use-main-category.hook";
import { useEffect, useState } from "react";
import SortByInput from "../../components/input/sort-by-input";
import Button from "../../components/button/button";

const CategoryListing = () => {
    const { mainCategories, isLoading, fetchNextPage, refetch, isFetchingNextPage, sortType } = useGetMainCategories()
    const [refreshing] = useState<boolean>(false)

    const [sort, setSort] = useState({
        column: sortType.column,
        direction: sortType.direction
    })

    const [isDirty, setIsDirty] = useState(false)

    const handleSortChanged = (column: string, direction: 'ASC' | 'DESC') => {
        setSort({ column, direction })
    }

    useEffect(() => {
        if (sort.column != sortType.column || sort.direction != sortType.direction) {
            setIsDirty(true)
        } else {
            setIsDirty(false)
        }
    }, [sort])

    return (
        <View style={{ flex: 1, backgroundColor: TW_COLOR.white }}>
            <AppHeader
                title="Category Listing"
                showBackButton
            />
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
                {isLoading ? <ActivityIndicator animating /> : (
                    <FlatList
                        refreshing={refreshing}
                        showsVerticalScrollIndicator={false}
                        onRefresh={refetch}
                        data={mainCategories}
                        contentContainerStyle={{ paddingVertical: 16 }}
                        renderItem={({ item, index }) => <CategoryCard mainCategory={item} key={index} />}
                        onEndReached={fetchNextPage}
                        onEndReachedThreshold={0.1}
                        ListHeaderComponent={
                            <View style={{ marginBottom: 16, gap: 8 }}>
                                <SortByInput
                                    value="CREATED_AT"
                                    direction="DESC"
                                    onSortChanged={(column, direction) => handleSortChanged(column, direction)}
                                    options={['CREATED_AT', 'NAME']}
                                />
                                {isDirty && <Button children='Apply Changes' onPress={() => alert('Save Changes')} />}
                            </View>
                        }
                        ListFooterComponent={
                            isFetchingNextPage ? <ActivityIndicator animating /> : null
                        }
                    />
                )}
            </View>
        </View>
    )
}

export default CategoryListing