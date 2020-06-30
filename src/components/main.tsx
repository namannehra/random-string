/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { Snackbar, TextField } from '@material-ui/core'
import { Fragment, memo, useCallback, useMemo, useState, useEffect } from 'react'

import { Button } from '../components/button'
import { Form } from '../components/form'
import { OptionsContainer } from '../container/options'
import { getRandomString } from '../utils/random-string'

const Main_ = () => {

    const { lowercase, uppercase, numbers, symbols, length } = OptionsContainer.useContainer()
    const [randomString, setRandomString] = useState('')
    const [copied, setCopied] = useState(true)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const updateRandomString = useCallback(() => {
        setRandomString(getRandomString({
            lowercase: !!lowercase,
            uppercase: !!uppercase,
            numbers: !!numbers,
            symbols: !!symbols,
            length: Number(length),
        }))
    }, [lowercase, uppercase, numbers, symbols, length, setRandomString])

    useEffect(() => {
        updateRandomString()
    }, [updateRandomString])

    const handleCopy = useCallback(() => {
        let cancel = false
        navigator.clipboard.writeText(randomString).then(() => {
            if (cancel) {
                return
            }
            setCopied(true)
        }, () => {
            if (cancel) {
                return
            }
            setCopied(false)
        }).finally(() => {
            if (cancel) {
                return
            }
            setSnackbarOpen(true)
        })
        return () => {
            cancel = true
        }
    }, [randomString, setSnackbarOpen])

    const handleSnackbarClose = useCallback(() => {
        setSnackbarOpen(false)
    }, [setSnackbarOpen])

    const snackbarMessage = useMemo(() => {
        if (copied) {
            return 'Copied'
        }
        return 'Copy failed'
    }, [copied])

    const mainCss = css`
        display: grid;
        grid-gap: 16px;
    `

    return (
        <Fragment>
            <main css={mainCss}>
                <Form onSubmit={updateRandomString}></Form>
                <TextField
                    label="String"
                    value={randomString}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                ></TextField>
                <Button onClick={handleCopy}>Copy</Button>
            </main>
            <Snackbar
                autoHideDuration={4000}
                disableWindowBlurListener
                message={snackbarMessage}
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            ></Snackbar>
        </Fragment>
    )

}

export const Main = memo(Main_)
