import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
    width: 100%;
    height: 56px;
    margin-bottom: 16px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_500};

    flex-direction: row;
    align-items: center;
`

export const Name = styled.Text`
    flex: 1;

    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_200};
    `}
`

export const Icon = styled(Feather).attrs(({ theme }) => ({
    size: 24,
    color: theme.COLORS.GRAY_200,
}))`
    margin-left: 16px;
    margin-right: 4px;
`
