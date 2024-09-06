import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacityProps } from "react-native";
import { ButtonProps, TouchableOpacity } from "react-native";
import { MAIN_COLORS } from "../../core/color/main-palette.color";

type IProps = TouchableOpacityProps & {
    children: ReactNode | string,
    size?: 'regular' | 'large'
}

const Button = (props: IProps) => {
    const { size = 'regular' } = props

    const defaultStyle = size == 'regular' ? styles.defaultButton : styles.largeButton
    const defaultFontStyle = size == 'regular' ? styles.buttonLabel : styles.buttonLabelLarge

    const combinedStyle = [defaultStyle, props.style];

    if (typeof (props.children) == 'string') {
        return <TouchableOpacity {...props} style={combinedStyle}><Text style={defaultFontStyle}>{props.children}</Text></TouchableOpacity>
    } else {
        return <TouchableOpacity {...props} style={combinedStyle}>{props.children}</TouchableOpacity>
    }
}

export default Button;

const styles = StyleSheet.create({
    defaultButton: {
        padding: 8,
        color: MAIN_COLORS.light.black,
        backgroundColor: MAIN_COLORS.light.primary,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    largeButton: {
        padding: 8,
        color: MAIN_COLORS.light.black,
        backgroundColor: MAIN_COLORS.light.primary,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 46
    },
    buttonLabel: {
        color: MAIN_COLORS.light.white,
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    buttonLabelLarge: {
        color: MAIN_COLORS.light.black,
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: 16
    }
})