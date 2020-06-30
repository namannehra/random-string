/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { Button } from '@material-ui/core'
import { memo } from 'react'

const Footer_ = () => {

    const footerCss = css`
        display: flex;
        justify-content: flex-end;
    `

    return (
        <footer css={footerCss}>
            <Button
                href="https://github.com/namannehra/random-string"
                target="_blank"
            >View source</Button>
        </footer>
    )

}

export const Footer = memo(Footer_)
