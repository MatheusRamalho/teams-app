import styled, { css } from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    margin: 32px 0;
`

export const Title = styled.Text`
    ${({ theme }) => css`
        text-align: center;
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.XL}px;
        color: ${theme.COLORS.WHITE};
    `};
`

export const Subtitle = styled.Text`
    ${({ theme }) => css`
        text-align: center;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_300};
    `};
`
