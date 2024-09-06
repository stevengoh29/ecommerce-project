import { TextProps, Text as RNText, StyleSheet } from "react-native"


const Text = (props: TextProps) => {
    return <RNText {...props} style={[styles.defaultText, props.style]}>{props.children}</RNText>
}

const styles = StyleSheet.create({
    defaultText: {
        fontFamily: 'Inter-Regular'
    }
})

export default Text