import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoryListing from '../../../screens/categories/category-listing.screen'
import HomeScreen from '../../../screens/home/home.screen'

const Stack = createNativeStackNavigator()

const HomeStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='CategoryListing' component={CategoryListing} />
        </Stack.Navigator>
    )
}

export default HomeStackScreen