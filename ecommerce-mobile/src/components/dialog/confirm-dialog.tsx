import { useCallback } from "react"
import { View } from "react-native"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import Button from "../button/button"
import Heading from "../text/heading"
import Text from "../text/text"
import { SvgXml } from "react-native-svg"
import SVG_ICON from "../../../assets/icons/icon-svg.constant"

export type ConfirmationOption = {
    title?: string;
    message: string;
    positiveLabel?: string;
    negativeLabel?: string;
    onPositiveAction: (dismiss: VoidFunction) => void;
    onNegativeAction?: (dismiss: VoidFunction) => void;
    noNegative?: boolean;
    // dialogIcon?: "success" | "warning";
}

type Props = ConfirmationOption & {
    onClose: () => void
}

const ConfirmDialog = (props: Props) => {
    const { title, message, positiveLabel = 'YES', negativeLabel = 'NO', onPositiveAction, onNegativeAction, noNegative, onClose } = props

    const onConfirmPress = useCallback(async () => {
        onPositiveAction(onClose)
    }, [onClose, onPositiveAction])

    const onAbortPress = useCallback(async () => {
        onClose()
    }, [onClose])

    return (
        <View style={{ backgroundColor: TW_COLOR.white, padding: 20, borderRadius: 8, width: 300 }}>
            <SvgXml xml={SVG_ICON.questionIcon} style={{ alignSelf: 'center' }} />
            <View style={{ marginBottom: 16, marginTop: 8 }}>
                {title && <Heading style={{ textAlign: 'left', marginBottom: 8, fontSize: 16 }}>{title}</Heading>}
                <Text style={{ textAlign: 'left' }}>{message}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <Button children={positiveLabel} onPress={onConfirmPress} style={{ flex: 1 }} />
                <Button children={negativeLabel} onPress={onAbortPress} style={{ flex: 1 }} />
            </View>
        </View>
    )
}

export default ConfirmDialog