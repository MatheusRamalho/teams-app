import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'

interface ButtonStyleProps {
    type: ButtonTypeStyleProps
}

export const Container = styled(TouchableOpacity)<ButtonStyleProps>`
    flex: 1;
    align-items: center;
    justify-content: center;

    min-height: 56px;
    max-height: 56px;
    border-radius: 6px;
    background-color: ${({ theme, type }) => (type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_700)};
`

export const Title = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.WHITE};
    `};
`
