/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppError } from '@utils/AppError'

import { PLAYER_COLLECTION } from './constants'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export const playersGetByGroup = async (group: string) => {
    try {
        const storedPlayersCollection = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

        const storagePlayersParse: PlayerStorageDTO[] = storedPlayersCollection
            ? JSON.parse(storedPlayersCollection)
            : []

        const players = storagePlayersParse

        return players
    } catch (error) {
        throw error
    }
}

export const playersGetByGroupAndTeam = async (group: string, team: string) => {
    try {
        const groupPlayersStorage = await playersGetByGroup(group)
        const teamPlayers = groupPlayersStorage.filter((player) => player.team === team)

        return teamPlayers
    } catch (error) {
        throw error
    }
}

export const playerAddByGroup = async (newPlayer: PlayerStorageDTO, group: string) => {
    try {
        const storedPlayers = await playersGetByGroup(group)

        const playerAlreadyExists = storedPlayers.filter((player) => player.name === newPlayer.name)

        if (playerAlreadyExists.length > 0) {
            throw new AppError('Essa pessoa já está adicionada em um time aqui.')
        }

        const newPlayerStorage = JSON.stringify([...storedPlayers, newPlayer])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, newPlayerStorage)
    } catch (error) {
        throw error
    }
}

export const playerRemoveByGroup = async (playerName: string, group: string) => {
    try {
        const storedPlayers = await playersGetByGroup(group)

        const playersWithoutParameterPlayer = storedPlayers.filter((player) => player.name !== playerName)

        const listPlayersStorage = JSON.stringify(playersWithoutParameterPlayer)

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, listPlayersStorage)
    } catch (error) {
        throw error
    }
}
