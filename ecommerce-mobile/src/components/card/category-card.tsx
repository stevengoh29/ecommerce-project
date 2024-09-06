import { Ionicons } from "@expo/vector-icons"
import { Image, TouchableOpacity } from "react-native"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import useDialog from "../../hooks/common/use-dialog.hook"
import Heading from "../text/heading"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../core/types/navigation.type"
import { MainCategory } from "../../services/category/category.type"

type Props = {
    mainCategory: MainCategory,
}

const CategoryCard = (props: Props) => {
    const { mainCategory } = props
    const navigation = useNavigation<NavigationProp<RootStackParamList, 'CATEGORY_LISTING'>>()

    const onClick = () => {
        navigation.navigate('SHOP_BY_CATEGORY', { categoryId: mainCategory.uuid, categoryName: mainCategory.name })
    }

    return (
        <>
            <TouchableOpacity
                onPress={onClick}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: TW_COLOR.gray[200], padding: 10, marginBottom: 8, borderRadius: 8 }}>
                <Image
                    source={require('../../../assets/icon.png')}
                    style={{ width: 48, height: 48, borderRadius: 50 }}
                />
                <Heading style={{ flex: 1, fontSize: 16 }}>{mainCategory.name}</Heading>
                <Ionicons name="chevron-forward" size={20} color={TW_COLOR.gray[500]} />
            </TouchableOpacity>
        </>
    )
}

export default CategoryCard