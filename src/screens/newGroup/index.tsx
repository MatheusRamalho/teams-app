import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { Container, Content, Icon } from './styles'

export const NewGroup = () => {
    const [group, setGroup] = useState<string>('')
    const navigation = useNavigation()

    const handleCreateNewGroup = () => {
        navigation.navigate('players', { group })
    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <Highlight title="Nova turma" subtitle="Crie uma turma para adicionar pessoas" />

                <Input placeholder="Nome da turma" onChangeText={setGroup} />

                <Button title="Criar" style={{ marginTop: 20 }} onPress={handleCreateNewGroup} />
            </Content>
        </Container>
    )
}
