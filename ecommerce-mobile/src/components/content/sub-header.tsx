import { StyleSheet, View } from "react-native"
import Heading from "../text/heading"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import { MAIN_COLORS } from "../../core/color/main-palette.color"
import Text from "../text/text"

type IProps = {
    title: string,
    subtitle?: string
}

const SubHeader = (props: IProps) => {
    return (
        <View style={styles.container}>
            <Heading style={styles.heading}>{props.title}</Heading>
            {props.subtitle && <Text style={styles.text}>{props.subtitle}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MAIN_COLORS.light.primary,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    heading: {
        color: TW_COLOR.white
    },
    text: {
        color: TW_COLOR.gray[100],
        fontSize: 10
    }
})

export default SubHeader