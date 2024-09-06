import { Image, ImageSourcePropType, ImageStyle, Pressable, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import Text from "../text/text"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import { Ionicons } from "@expo/vector-icons"

type Props = {
    onPress: () => void
    imageSource: ImageSourcePropType
    label?: string
    isSelected?: boolean
    containerStyle?: StyleProp<ViewStyle>
    imageStyle?: StyleProp<ImageStyle>
    labelStyle?: StyleProp<TextStyle>
}

const Avatar = (props: Props) => {
    const { onPress, imageSource, isSelected, label, containerStyle, imageStyle, labelStyle } = props
    return (
        <Pressable style={[{ width: 60 }, containerStyle]} onPress={onPress}>
            <Image
                source={imageSource}
                style={[
                    { height: 60, width: 60, borderRadius: 50 },
                    isSelected ? { borderWidth: 2, borderColor: TW_COLOR.green[800] } : null,
                    imageStyle
                ]}
            />
            {isSelected &&
                <Ionicons
                    name="checkmark-circle"
                    size={20}
                    style={{ position: 'absolute', alignSelf: 'flex-end', backgroundColor: 'white', borderRadius: 50, borderColor: TW_COLOR.green[800] }}
                    color={TW_COLOR.green[800]}
                />
            }
            {label &&
                <Text
                    numberOfLines={1}
                    style={[
                        { textAlign: 'center', fontSize: 14, marginTop: 4, fontWeight: '500' },
                        labelStyle
                    ]}
                >
                    {label}
                </Text>
            }
        </Pressable>
    )
}

export default Avatar