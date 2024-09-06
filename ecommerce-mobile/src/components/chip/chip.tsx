import { StyleSheet, Pressable, TouchableOpacity, View } from "react-native"
import Text from "../text/text"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"

type Props = {
    isSelected: boolean
    onPress: () => void
}

const Chip = (props: Props) => {
    const { isSelected, onPress } = props

    return (
        <Pressable style={[styles.container, isSelected ? styles.selectedItem : null]} onPress={onPress}>
            <Text style={isSelected ? styles.selectedLabel : null}>Variant 1</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: TW_COLOR.gray[300],
        borderRadius: 4
    },
    selectedItem: {
        borderColor: TW_COLOR.green[500],
    },
    selectedLabel: {
        color: TW_COLOR.green[500],
        fontFamily: 'Inter-SemiBold'
    }
})

export default Chip