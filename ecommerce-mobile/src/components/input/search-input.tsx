import { Ionicons } from "@expo/vector-icons"
import { View, ViewStyle } from "react-native"
import { TW_COLOR } from "../../core/color/tailwind-palette.color"
import TextInput from "./text-input"

type Props = {
    containerStyle?: ViewStyle
    placeholder?: string
    value: string
    onTextChanged: (text: string) => void
}

const SearchInput = (props: Props) => {
    return (
        <View style={[props.containerStyle, { flexDirection: 'row', backgroundColor: 'white', borderRadius: 4, alignItems: 'center', paddingHorizontal: 8, borderColor: TW_COLOR.gray[200], borderWidth: 1 }]}>
            <Ionicons name="search" size={22} color={TW_COLOR.gray[300]} />
            <TextInput style={{ borderWidth: 0, flex: 1 }} placeholder="Search product..." value={props.value} onChangeText={(text) => props.onTextChanged(text)} />
        </View>
    )
}

export default SearchInput