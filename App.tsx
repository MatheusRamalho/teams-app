/* eslint-disable camelcase */
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { defaultTheme } from '@theme/index'

import { Loading } from '@components/Loading'

import { Routes } from '@routes/index'

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

    return (
        <ThemeProvider theme={defaultTheme}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {fontsLoaded ? <Routes /> : <Loading />}
        </ThemeProvider>
    )
}
