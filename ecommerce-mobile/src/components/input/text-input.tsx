import { StyleSheet, TextInputProps, TextInput as TextInputRN } from "react-native"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"

const TextInput = (props: TextInputProps) => {
    return <TextInputRN {...props}
        style={[
            styles.textInputStyle,
            props.style,
            props.multiline ? styles.multiline : null,
            props.editable == false ? styles.disabled : null,
        ]}
    />
}

const styles = StyleSheet.create({
    textInputStyle: {
        borderWidth: 1,
        borderColor: TW_COLOR.gray[300],
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        fontFamily: 'Inter-Regular'
    },
    multiline: {
        height: 100
    },
    disabled: {
        backgroundColor: '#d8d8d8'
    }
})

export default TextInput