/* eslint-disable camelcase */
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { defaultTheme } from '@theme/index'

import { Loading } from '@components/Loading'

import { Groups } from '@screens/groups'

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

    return (
        <ThemeProvider theme={defaultTheme}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {fontsLoaded ? <Groups /> : <Loading />}
        </ThemeProvider>
    )
}
