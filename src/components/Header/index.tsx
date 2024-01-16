import logoImg from '@assets/logo.png'

import { BackButton, BackIcon, Container, Logo } from './styles'

interface HeaderProps {
    showBackButton?: boolean
}

export const Header = ({ showBackButton = false }: HeaderProps) => {
    return (
        <Container>
            {showBackButton && (
                <BackButton>
                    <BackIcon />
                </BackButton>
            )}

            <Logo source={logoImg} />
        </Container>
    )
}
