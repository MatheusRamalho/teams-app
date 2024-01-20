import { useState } from 'react'
import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'

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
    const [team, setTeam] = useState<string>('Time A')
    const [players, setPlayers] = useState<string[]>([])

    const route = useRoute()
    const { group } = route.params as RoutesParams

    const handleActiveTeam = (item: string) => {
        setTeam(item)
    }

    const handleRemovePlayer = () => {
        console.log('clicou')
    }

    return (
        <Container>
            <Header showBackButton />

            <Highlight title={group} subtitle="adicione a galera e separe os times" />

            <Form>
                <Input placeholder="Nome da pessoa" autoCorrect={false} />
                <ButtonIcon icon="plus" type="PRIMARY" />
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

            <FlatList
                data={players}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <PlayerCard name={item} onRemove={() => handleRemovePlayer} />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time" />}
                contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
            />

            <Button type="SECONDARY" title="Remover turma" />
        </Container>
    )
}
