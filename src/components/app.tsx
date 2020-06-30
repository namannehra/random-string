/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { memo } from 'react'

import { Footer } from '../components/footer'
import { GlobalCss } from '../components/global-css'
import { Header } from '../components/header'
import { Main } from '../components/main'
import { Manifest } from '../components/manifest'
import { ThemeMeta } from '../components/theme-meta'
import { OptionsContainer } from '../container/options'
import { ThemeProvider } from '../container/theme'

const App_ = () => {

    const appCss = css`
        display: grid;
        grid:
            'header         '
            'main           '
            '.              ' 1fr
            'footer         '
            /minmax(0, auto)
        ;
        grid-gap: 16px;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        padding: 16px;

        @media (min-width: 600px) {
            & {
                width: 480px;
            }
        }

    `

    const headerCss = css`
        grid-area: header;
    `

    const mainCss = css`
        grid-area: main;
    `

    const footerCss = css`
        grid-area: footer;
    `

    return (
        <ThemeProvider>
            <Manifest></Manifest>
            <ThemeMeta></ThemeMeta>
            <GlobalCss></GlobalCss>
            <OptionsContainer.Provider>
                <div css={appCss}>
                    <div css={headerCss}>
                        <Header></Header>
                    </div>
                    <div css={mainCss}>
                            <Main></Main>
                    </div>
                    <div css={footerCss}>
                        <Footer></Footer>
                    </div>
                </div>
            </OptionsContainer.Provider>
        </ThemeProvider>
    )

}

export const App = memo(App_)
