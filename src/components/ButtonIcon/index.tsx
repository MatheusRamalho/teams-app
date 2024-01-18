import { TouchableOpacityProps } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { Container, ButtonIconTypeStyleProps, Icon } from './styles'

interface ButtonIconProps extends TouchableOpacityProps {
    icon: keyof typeof Feather.glyphMap
    type?: ButtonIconTypeStyleProps
}

export const ButtonIcon = ({ icon, type = 'PRIMARY', ...rest }: ButtonIconProps) => {
    return (
        <Container {...rest}>
            <Icon name={icon} type={type} />
        </Container>
    )
}
