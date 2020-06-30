export const enum ThemeType {
    light = 'light',
    dark = 'dark',
}

export interface Theme {
    type: ThemeType
    primary: string
    background: string
    text: string
}
