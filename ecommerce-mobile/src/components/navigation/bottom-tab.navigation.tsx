import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BOTTOM_TAB_MENU } from '../../core/config/navigation/bottom-tab-menu.config'

const Tab = createBottomTabNavigator()

const BottomTabScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 60, paddingBottom: 10 },
            }}
        >
            {BOTTOM_TAB_MENU.map((bottomTab, index) => {
                return <Tab.Screen
                    key={index}
                    name={bottomTab.name}
                    component={bottomTab.component}
                    options={{
                        tabBarLabel: bottomTab.title,
                        tabBarIcon: ({ color, focused, size }) => <Ionicons name={bottomTab.iconName as any} size={size} color={color} />
                    }}
                />
            })}
        </Tab.Navigator>
    )
}

export default BottomTabScreen