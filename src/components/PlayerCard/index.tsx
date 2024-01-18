import { ButtonIcon } from '@components/ButtonIcon'

import { Container, Icon, Name } from './styles'

interface PlayerCardProps {
    name: string
    onRemove: () => void
}

export const PlayerCard = ({ name, onRemove }: PlayerCardProps) => {
    return (
        <Container>
            <Icon name="user" />

            <Name> {name} </Name>

            <ButtonIcon icon="x" type="SECONDARY" onPress={onRemove} />
        </Container>
    )
}
