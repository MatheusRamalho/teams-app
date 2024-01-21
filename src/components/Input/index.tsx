import { RefObject } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container } from './styles'

interface InputProps extends TextInputProps {
    inputRef?: RefObject<TextInput>
}

export const Input = ({ inputRef, ...rest }: InputProps) => {
    const { COLORS } = useTheme()

    return <Container ref={inputRef} {...rest} placeholderTextColor={COLORS.GRAY_300} />
}
