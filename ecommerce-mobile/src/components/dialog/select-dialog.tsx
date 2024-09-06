import { TouchableOpacity, View, StyleSheet } from "react-native"
import Text from "../text/text"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import Heading from "../text/heading"
import Button from "../button/button"
import { Ionicons } from "@expo/vector-icons"

export type SelectOption = {
    title?: string
    currentValue?: string | null | undefined
    options: string[]
    onSelect: (dismiss: VoidFunction, selectedValue: string) => void
}

type Props = SelectOption & {
    onClose: () => void
}

const SelectDialog = (props: Props) => {
    const { title = 'SELECT OPTION', currentValue, onClose, onSelect, options } = props

    const onSelectedChanged = (option: string) => {
        onSelect(onClose, option)
        onClose()
    }

    return (
        <View style={{ backgroundColor: TW_COLOR.white, padding: 20, borderRadius: 8, width: 300 }}>
            <View>
                {title && <Heading style={{ textAlign: 'left', fontSize: 16 }}>{title}</Heading>}
            </View>
            <View style={{ marginVertical: 16 }}>
                {options.map((option, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.optionContainer, index == 0 ? { borderTopWidth: 1 } : null]}
                            onPress={() => onSelectedChanged(option)}
                        >
                            <Text>{option}</Text>
                            {currentValue == option && <Ionicons name="checkmark" size={20} color={TW_COLOR.green[600]} />}
                        </TouchableOpacity>
                    )
                })}
            </View>

            <Button children={'Cancel'} onPress={onClose} />
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <Button children={positiveLabel} onPress={onConfirmPress} style={{ flex: 1 }} />
                <Button children={negativeLabel} onPress={onAbortPress} style={{ flex: 1 }} />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    optionContainer: {
        padding: 8,
        borderBottomWidth: 1,
        borderColor: TW_COLOR.gray[300],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default SelectDialog