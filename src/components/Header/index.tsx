import { useNavigation } from '@react-navigation/native'

import logoImg from '@assets/logo.png'

import { BackButton, BackIcon, Container, Logo } from './styles'

interface HeaderProps {
    showBackButton?: boolean
}

export const Header = ({ showBackButton = false }: HeaderProps) => {
    const navigation = useNavigation()

    /**
     * Quando se quer voltar uma tela use-se: goBack()
     * Quando se quer independete da tela voltar pro inicio usa-se: navigate('')
     */
    const handleGoBack = () => {
        navigation.navigate('home')
    }

    return (
        <Container>
            {showBackButton && (
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            )}

            <Logo source={logoImg} />
        </Container>
    )
}
