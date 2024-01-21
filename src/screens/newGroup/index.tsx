import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { groupCreate } from '@storage/group'

import { displayError } from '@utils/displayError'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { Container, Content, Icon } from './styles'

export const NewGroup = () => {
    const [group, setGroup] = useState<string>('')
    const navigation = useNavigation()

    const validatingGroupNameIsNotEmptyOrContainsSpaces = group.trim().length === 0

    const handleCreateNewGroup = async () => {
        try {
            if (validatingGroupNameIsNotEmptyOrContainsSpaces) {
                return Alert.alert('Novo grupo', 'Informe um nome para o grupo')
            }

            await groupCreate(group)
            navigation.navigate('players', { group })
        } catch (error) {
            displayError(error, 'Nova grupo', 'Não foi possível criar um novo grupo')
        }
    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <Highlight title="Nova turma" subtitle="Crie uma turma para adicionar pessoas" />

                <Input placeholder="Nome da turma" onChangeText={setGroup} />

                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handleCreateNewGroup}
                    // disabled={valitadeGroup}
                />
            </Content>
        </Container>
    )
}
