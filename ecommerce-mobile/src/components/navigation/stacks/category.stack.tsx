import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { STACK_CATEGORY_SCREEN } from '../../../core/config/navigation/stack-screen-list.config'

const Stack = createNativeStackNavigator()

const CategoryStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {STACK_CATEGORY_SCREEN.map((screen, index) => {
                return <Stack.Screen name={screen.name} key={index} component={screen.component} />
            })}
        </Stack.Navigator>
    )
}

export default CategoryStackScreen