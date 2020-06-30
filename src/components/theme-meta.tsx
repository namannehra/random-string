import React, { memo } from 'react'
import { Helmet } from 'react-helmet'

import { useTheme } from '../container/theme'

const ThemeMeta_ = () => {

    const theme = useTheme()

    return (
        <Helmet>
            <meta name="theme-color" content={theme.background}></meta>
        </Helmet>
    )

}

export const ThemeMeta = memo(ThemeMeta_)
