import { StyleSheet, Text, TextInputProps, TextProps } from "react-native"

const Heading = (props: TextProps) => {
    return <Text {...props} style={[styles.textDefault, props.style]}>{props.children}</Text>
}

const styles = StyleSheet.create({
    textDefault: {
        fontWeight: '600',
        fontSize: 18,
        fontFamily: 'Inter-Bold'
    }
})

export default Heading