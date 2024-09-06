import { Ionicons } from "@expo/vector-icons"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import { MAIN_COLORS } from "../../core/color/main-palette.color"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import SearchInput from "../input/search-input"
import Heading from "../text/heading"

type Props = {
    type?: 'SHOW_APP_BAR' | 'SHOW_TITLE_ONLY'
    showBackButton?: boolean
    title?: string
}

const AppHeader = (props: Props) => {
    const { type = 'SHOW_TITLE_ONLY', title, showBackButton = false } = props
    const navigation = useNavigation<NavigationProp<any>>()

    return (
        <View style={styles.container}>
            {type == 'SHOW_TITLE_ONLY' &&
                <>
                    {showBackButton && <Ionicons name="chevron-back" size={24} color={TW_COLOR.white} onPress={() => navigation.goBack()} />}
                    <Heading style={{ color: TW_COLOR.white, textTransform: 'uppercase' }}>{title ?? ''}</Heading>
                </>
            }

            {type == 'SHOW_APP_BAR' &&
                <>
                    <SearchInput containerStyle={{ flex: 1 }} />
                    <Ionicons name="mail" size={22} color={TW_COLOR.white} />
                    <Ionicons name="notifications" size={22} color={TW_COLOR.white} />
                    <Ionicons name="cart" size={22} color={TW_COLOR.white} />
                    <Ionicons name="menu" size={22} color={TW_COLOR.white} />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MAIN_COLORS.light.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    }
})

export default AppHeader