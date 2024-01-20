import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '@screens/home'
import { NewGroup } from '@screens/newGroup'
import { Players } from '@screens/players'

const { Navigator, Screen } = createNativeStackNavigator()

export const AppRoutes = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
            <Screen name="home" component={Home} />
            <Screen name="new" component={NewGroup} />
            <Screen name="players" component={Players} />
        </Navigator>
    )
}
