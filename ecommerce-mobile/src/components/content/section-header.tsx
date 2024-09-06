import { Ionicons } from "@expo/vector-icons"
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native"
import Heading from "../text/heading"
import Text from "../text/text"

type Props = {
    title: string
    buttonSeeAll?: boolean
    onButtonSeeAllPress?: () => void
    style?: ViewStyle
}

const SectionHeader = (props: Props) => {
    const { title, buttonSeeAll = false, onButtonSeeAllPress, style } = props

    return (
        <View style={[styles.container, style]}>
            <Heading>{title}</Heading>
            {buttonSeeAll &&
                <TouchableOpacity style={styles.container} onPress={onButtonSeeAllPress}>
                    <Text>See All</Text>
                    <Ionicons name="chevron-forward" />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8
    }
})

export default SectionHeader