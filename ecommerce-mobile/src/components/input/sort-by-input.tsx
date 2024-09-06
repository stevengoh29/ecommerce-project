import { Pressable, StyleSheet, View, ViewStyle } from "react-native"
import Text from "../text/text"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import { Ionicons } from "@expo/vector-icons"
import TextInput from "./text-input"
import { useState, useEffect } from "react"
import useDialog from "../../hooks/common/use-dialog.hook"

type Props = {
    containerStyle?: ViewStyle
    placeholder?: string
    options: string[]
    value: string
    direction: 'ASC' | 'DESC'
    onSortChanged: (column: string, direction: 'ASC' | 'DESC') => void
}

const SortByInput = (props: Props) => {
    const [direction, setDirection] = useState(props.direction ?? 'DESC')
    const [value, setValue] = useState(props.value ?? 'CREATED_AT')

    const dialog = useDialog()

    const onDirectionToggle = () => setDirection(direction == 'ASC' ? 'DESC' : 'ASC')
    const onValueSelectedChanged = () => {
        dialog.select({
            currentValue: value,
            onSelect: (_, value) => { setValue(value) },
            options: props.options,
        })
    }

    useEffect(() => {
        props.onSortChanged(value, direction)
    }, [value, direction])

    return (
        <View style={[props.containerStyle, styles.inputContainer]}>
            <Pressable style={styles.optionContainer} onPress={onValueSelectedChanged}>
                <Text style={!value ? { color: TW_COLOR.gray[400] } : null}>{value ?? 'Sort by...'}</Text>
            </Pressable>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minWidth: 80, borderLeftColor: TW_COLOR.gray[300], borderLeftWidth: 1, padding: 8, gap: 4 }} onPress={onDirectionToggle}>
                <Text>{direction}</Text>
                <Ionicons name={direction == 'ASC' ? 'arrow-up' : 'arrow-down'} size={16} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        borderColor: TW_COLOR.gray[200],
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    optionContainer: {
        flex: 1,
        padding: 8
    },
})

export default SortByInput