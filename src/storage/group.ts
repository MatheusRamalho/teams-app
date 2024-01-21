/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppError } from '@utils/AppError'

import { GROUP_COLLECTION, PLAYER_COLLECTION } from './constants'

export const groupsGetAll = async () => {
    try {
        const storedGroupCollection = await AsyncStorage.getItem(GROUP_COLLECTION)
        const storageGroupsParse: string[] = storedGroupCollection ? JSON.parse(storedGroupCollection) : ''
        const groups = storageGroupsParse

        return groups
    } catch (error) {
        throw error
    }
}

export const groupCreate = async (newGroup: string) => {
    try {
        const storedGroups = await groupsGetAll()

        const groupAlreadyExists = storedGroups.includes(newGroup)

        if (groupAlreadyExists) {
            throw new AppError('Já existe um grupo cadastrado com esse nome!')
        }

        const newStorageGroup = JSON.stringify([...storedGroups, newGroup])

        await AsyncStorage.setItem(GROUP_COLLECTION, newStorageGroup)
    } catch (error) {
        throw error
    }
}

export const groupRemove = async (groupDeleted: string) => {
    try {
        const storedGroups = await groupsGetAll()
        const groupsWithoutStored = storedGroups.filter((group) => group !== groupDeleted)

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groupsWithoutStored)) // Deleta o grupo
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`) // Deleta os players do grupo
    } catch (error) {
        throw error
    }
}
