/** @jsx jsx */

import { css, Global, jsx } from '@emotion/core'
import { memo } from 'react'

import { useTheme } from '../container/theme'

const GlobalCss_ = () => {

    const theme = useTheme()

    const globalCss = css`
        html {
            background-color: ${theme.background};
            height: 100%;
        }
        body {
            height: 100%;
            margin: 0;
        }
        #root {
            display: flex;
            justify-content: center;
            height: 100%;
        }
    `

    return (
        <Global styles={globalCss}></Global>
    )

}

export const GlobalCss = memo(GlobalCss_)
