import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import React, {
    createContext,
    Fragment,
    memo,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { Helmet } from 'react-helmet'

import { Theme } from '../libs/theme'
import { darkTheme } from '../themes/dark'
import { lightTheme } from '../themes/light'

const ThemeContext = createContext<Theme | undefined>(undefined)

export interface ThemeProviderProps {
    children: ReactNode
}

const fontStylesheet = (
    'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=block'
)
const fontFamily = `'Roboto Mono', monospace`

const ThemeProvider_ = (props: ThemeProviderProps) => {

    const [theme, setTheme] = useState(lightTheme)

    const muiTheme = useMemo(() => createMuiTheme({
        palette: {
            type: theme.type,
            primary: {
                main: theme.primary,
            },
        },
        typography: {
            fontFamily,
        },
    }), [theme])

    useEffect(() => {
        const mediaQueryList = matchMedia('(prefers-color-scheme: dark)')
        if (mediaQueryList.matches) {
            setTheme(darkTheme)
        } else {
            setTheme(lightTheme)
        }
        const handleChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setTheme(darkTheme)
            } else {
                setTheme(lightTheme)
            }
        }
        mediaQueryList.addEventListener('change', handleChange)
        return () => {
            mediaQueryList.removeEventListener('change', handleChange)
        }
    }, [])

    return (
        <Fragment>
            <Helmet>
                <link rel="stylesheet" href={fontStylesheet}></link>
            </Helmet>
            <ThemeContext.Provider value={theme}>
                <MuiThemeProvider theme={muiTheme}>
                    {props.children}
                </MuiThemeProvider>
            </ThemeContext.Provider>
        </Fragment>
    )

}

export const ThemeProvider = memo(ThemeProvider_)

export const useTheme = () => {
    const theme = useContext(ThemeContext)
    if (!theme) {
        throw new Error('No provider')
    }
    return theme
}
