/** @jsx jsx */

import { css, jsx } from '@emotion/core'
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import { ChangeEventHandler, FormEventHandler, memo, useCallback, useMemo } from 'react'

import { Button } from '../components/button'
import { OptionsContainer } from '../container/options'
import { useTheme } from '../container/theme'

export interface FormProps {
    onSubmit: () => void
}

const Form_ = (props: FormProps) => {

    const theme = useTheme()
    const {
        lowercase,
        setLowercase,
        uppercase,
        setUppercase,
        numbers,
        setNumbers,
        symbols,
        setSymbols,
        length,
        setLength,
    } = OptionsContainer.useContainer()

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(event => {
        event.preventDefault()
        props.onSubmit()
    }, [props.onSubmit])

    const handleLengthChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        if (event.target.validity.valid) {
            setLength(Number(event.target.value))
        } else {
            setLength(undefined)
        }
    }, [setLength])

    const disabled = useMemo(() => (
        !((lowercase || uppercase || numbers || symbols) && length)
    ), [lowercase, uppercase, numbers, symbols, length])

    const formCss = css`
        display: grid;
        grid:
            'lowercase uppercase'
            'numbers   symbols  '
            'length    generate '
            /1fr       1fr
        ;
        grid-gap: 16px;
        color: ${theme.text};
    `

    const lengthCss = css`
        grid-area: length;
    `

    const generateCss = css`
        grid-area: generate;
    `

    const checkboxes = ([
        ['lowercase', 'a-z', lowercase, setLowercase],
        ['uppercase', 'A-Z', uppercase, setUppercase],
        ['numbers',   '0-9', numbers,   setNumbers  ],
        ['symbols',   '!@#', symbols,   setSymbols  ],
    ] as const).map(([gridArea, label, checked, setChecked]) => {
        const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
            setChecked(event.target.checked)
        }
        const checkboxCss = css`
            grid-area: ${gridArea};
        `
        return (
            <div key={gridArea} css={checkboxCss}>
                <FormControlLabel
                    label={label}
                    control={
                        <Checkbox
                            color="primary"
                            checked={!!checked}
                            onChange={handleChange}
                        ></Checkbox>
                    }
                ></FormControlLabel>
            </div>
        )
    })

    return (
        <form css={formCss} onSubmit={handleSubmit}>
            {checkboxes}
            <div css={lengthCss}>
                <TextField
                    type="number"
                    label="Length"
                    value={length ?? ''}
                    onChange={handleLengthChange}
                    required
                    InputLabelProps={{
                        required: false,
                    }}
                    inputProps={{
                        min: 1,
                        max: 65536,
                    }}
                    variant="outlined"
                    fullWidth
                ></TextField>
            </div>
            <div css={generateCss}>
                <Button
                    type="submit"
                    fullWidth
                    disabled={disabled}
                >Generate</Button>
            </div>
        </form>
    )

}

export const Form = memo(Form_)
