import { Alert } from 'react-native'

import { AppError } from './AppError'

export const displayError = (error: unknown, keyMessage: string, message: string) => {
    if (error instanceof AppError) {
        Alert.alert(keyMessage, error.message)
    } else {
        console.log(error)
        Alert.alert(keyMessage, message)
    }
}
