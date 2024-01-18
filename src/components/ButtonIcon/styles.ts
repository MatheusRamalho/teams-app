import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

export type ButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY'

interface ButtonIconStyleProps {
    type: ButtonIconTypeStyleProps
}

export const Container = styled(TouchableOpacity)<ButtonIconStyleProps>`
    align-items: center;
    justify-content: center;
    gap: 12px;

    width: 56px;
    height: 56px;
    border-radius: 2px;
`

export const Icon = styled(Feather).attrs<ButtonIconStyleProps>(({ theme, type }) => ({
    size: 24,
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_700,
}))``
