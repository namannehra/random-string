/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { Fragment, memo, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import useResizeObserver from 'use-resize-observer/polyfilled'

import { useTheme } from '../container/theme'

const fontStylesheet = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=block'
const fontFamily = `'Roboto Mono', monospace`
const fontWeight = 500

const charHeightByWidth = 5 / 3
const title = 'random-string'

const Header_ = () => {

    const theme = useTheme()
    const { ref, width = 0 } = useResizeObserver()

    const fontSize = useMemo(() => (
        charHeightByWidth * width / title.length
    ), [width])

    const headerCss = css`
        display: flex;
        justify-content: center;
        width: 100%;
    `

    const titleCss = css`
        color: ${theme.text};
        font-family: ${fontFamily};
        font-size: ${fontSize}px;
        font-weight: ${fontWeight};
        line-height: 1;
        white-space: nowrap;
        margin: 0;
    `

    return (
        <Fragment>
            <Helmet>
                <link rel="stylesheet" href={fontStylesheet}></link>
            </Helmet>
            <header ref={ref} css={headerCss}>
                <h1 css={titleCss}>{title}</h1>
            </header>
        </Fragment>
    )

}

export const Header = memo(Header_)
