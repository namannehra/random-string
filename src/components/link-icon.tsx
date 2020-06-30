import React, { memo, useMemo } from 'react'
import { Helmet } from 'react-helmet'

import { useTheme } from '../container/theme'
// @ts-ignore
import darkIcon from '../icons/dark.svg'
// @ts-ignore
import lightIcon from '../icons/light.svg'
import { ThemeType } from '../libs/theme'

const LinkIcon_ = () => {

    const theme = useTheme()

    const icon = useMemo(() => {
        switch (theme.type) {
            case ThemeType.light:
                return lightIcon
            case ThemeType.dark:
                return darkIcon
        }
    }, [theme])

    return (
        <Helmet>
            <link rel="icon" href={icon}></link>
        </Helmet>
    )

}

export const LinkIcon = memo(LinkIcon_)
