import { useState, useCallback } from 'react'
import { Alert, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { groupsGetAll } from '@storage/group'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { Container } from './styles'

export const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<string[]>([])
    const navigation = useNavigation()

    const handleNewGroup = () => {
        navigation.navigate('new')
    }

    const fetchGroups = async () => {
        try {
            setIsLoading(true)

            const data = await groupsGetAll()

            setGroups(data)
        } catch (error) {
            console.log(error)
            Alert.alert('Turmas', 'Não foi possível carregar as turmas')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGroupOpen = (group: string) => {
        navigation.navigate('players', { group })
    }

    /*
     * Usar o useFocusEffect no lugar do useEffect.
     * Usar o useCallback dentro do useFocusEffect
     */
    useFocusEffect(
        useCallback(() => {
            fetchGroups()
        }, []),
    )

    return (
        <Container>
            <Header />

            <Highlight title="Turmas" subtitle="Jogue com sua turma" />

            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={groups}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => <GroupCard title={item} onPress={() => handleGroupOpen(item)} />}
                    contentContainerStyle={groups.length === 0 && { flex: 1 }}
                    ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma" />}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <Button title="Criar nova turma" onPress={handleNewGroup} />
        </Container>
    )
}
