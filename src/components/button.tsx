/** @jsx jsx */

import { ClassNames, jsx } from '@emotion/core'
import { Button as MuiButton } from '@material-ui/core'
import { ButtonHTMLAttributes, MouseEventHandler, memo, ReactNode } from 'react'

export interface ButtonProps {
    children: ReactNode
    disabled?: boolean
    fullWidth?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const Button_ = (props: ButtonProps) => (
    <ClassNames>
        {({css}) => {
            const className = css`
                height: 56px;
            `
            return (
                <MuiButton
                    classes={{
                        root: className,
                    }}
                    color="primary"
                    variant="contained"
                    {...props}
                ></MuiButton>
            )
        }}
    </ClassNames>
)

export const Button = memo(Button_)
