import 'styled-components/native'

import { defaultTheme } from '@theme/index'

declare module 'styled-components/native' {
    type ThemeType = typeof defaultTheme

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends ThemeType {}
}
