import { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { displayError } from '@utils/displayError'

import { playersGetByGroupAndTeam, playerAddByGroup, playerRemoveByGroup } from '@storage/player'
import { groupRemove } from '@storage/group'
import { PlayerStorageDTO } from '@storage/PlayerStorageDTO'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

interface RoutesParams {
    group: string
}

export const Players = () => {
    const [, setIsLoading] = useState(true)
    const [team, setTeam] = useState<string>('Time A')
    const [newPlayerName, setNewPlayerName] = useState<string>('')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const newPlayerNameInputRef = useRef<TextInput>(null)

    const route = useRoute()
    const { group } = route.params as RoutesParams

    const navigation = useNavigation()

    const validatingPlayerNameIsNotEmptyOrContainsSpaces = newPlayerName.trim().length === 0

    const handleActiveTeam = (item: string) => {
        setTeam(item)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchPlayersByTeam = async () => {
        try {
            setIsLoading(true)

            const playerByTeam = await playersGetByGroupAndTeam(group, team)

            setPlayers(playerByTeam)
        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado')
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddPlayer = async () => {
        if (validatingPlayerNameIsNotEmptyOrContainsSpaces) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar')
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group)

            fetchPlayersByTeam()

            newPlayerNameInputRef.current?.blur() // Remove o foco do input
            setNewPlayerName('')
        } catch (error) {
            displayError(error, 'Nova Pessoa', 'Não foi possível adicionar essa pessoa ao time')
        }
    }

    const handleRemovePlayer = async (playerName: string) => {
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()
        } catch (error) {
            displayError(error, 'Remover Pessoa', 'Não foi possível remover essa pessoa')
        }
    }

    const groupRemoveByName = async () => {
        try {
            await groupRemove(group)
            navigation.navigate('home')
        } catch (error) {
            displayError(error, 'Remover turma', 'Não foi possível remover a turma')
        }
    }

    const handleRemoveGroup = async () => {
        Alert.alert('Remove', 'Deseja remover a turma?', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => groupRemoveByName() },
        ])
    }

    useEffect(() => {
        fetchPlayersByTeam()
    }, [fetchPlayersByTeam, group, team])

    return (
        <Container>
            <Header showBackButton />

            <Highlight title={group} subtitle="adicione a galera e separe os times" />

            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    value={newPlayerName}
                    onChangeText={setNewPlayerName}
                    inputRef={newPlayerNameInputRef} // Referencia para poder remover o foco
                    onSubmitEditing={handleAddPlayer} // Qual funcão executada quando clicar no botão de confirmar do teclado
                    returnKeyType="done" // Faz o icone de confirmar
                />
                <ButtonIcon icon="plus" type="PRIMARY" onPress={handleAddPlayer} />
            </Form>

            <HeaderList>
                <FlatList
                    horizontal
                    data={['Time A', 'Time B']}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Filter title={item} isActive={item === team} onPress={() => handleActiveTeam(item)} />
                    )}
                />

                <NumberOfPlayers> {players.length} </NumberOfPlayers>
            </HeaderList>

            {/* {isLoading ? (
                <Loading />
            ) : ( */}
            <FlatList
                data={players}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
                contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
            />
            {/* )} */}

            <Button type="SECONDARY" title="Remover turma" onPress={handleRemoveGroup} />
        </Container>
    )
}
