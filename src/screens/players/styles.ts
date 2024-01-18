import styled, { css } from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    padding: 24px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const Form = styled.View`
    width: 100%;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_700};

    flex-direction: row;
    justify-content: center;
`

export const HeaderList = styled.View`
    width: 100%;
    margin: 32px 0 12px;
    margin-bottom: 32px;

    flex-direction: row;
    align-items: center;
`

export const NumberOfPlayers = styled.Text`
    ${({ theme }) => css`
        color: ${theme.COLORS.GRAY_200};
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.SM}px;
    `};
`
