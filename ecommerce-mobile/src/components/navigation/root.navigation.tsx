import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { STACK_ROOT_SCREEN } from '../../core/config/navigation/stack-screen-root-list.config'

const RootStack = createNativeStackNavigator()

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }} >
                {STACK_ROOT_SCREEN.map((screen, index) => {
                    return <RootStack.Screen key={index} name={screen.name} component={screen.component} />
                })}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation