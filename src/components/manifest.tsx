import React, { memo, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { useTheme } from '../container/theme'
import { useMounted } from '../hooks/mounted'
// @ts-ignore
import icon from '../icon.svg'

const Manifest_ = () => {

    const theme = useTheme()
    const mounted = useMounted()
    const [manifest, setManifest] = useState('')

    useEffect(() => {
        if (!mounted) {
            return
        }
        const manifest = {
            name: 'random-string',
            short_name: 'rnd-str',
            description: 'Generate cryptographically secure random strings',
            start_url: location.origin,
            display: 'standalone',
            theme_color: theme.background,
            background_color: theme.background,
            icons: [
                {
                    src: location.origin + icon,
                    type: 'image/svg+xml',
                    sizes: '512x512',
                    purpose: 'maskable any',
                },
            ],
        }
        const string = JSON.stringify(manifest)
        const blob = new Blob([string], {
            type: 'application/manifest+json',
        })
        const url = URL.createObjectURL(blob)
        setManifest(url)
        return () => {
            URL.revokeObjectURL(url)
        }
    }, [theme, mounted])

    return (
        <Helmet>
            <link rel="manifest" href={manifest}></link>
        </Helmet>
    )

}

export const Manifest = memo(Manifest_)
