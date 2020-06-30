import { Dispatch, SetStateAction } from 'react'

import { useLocalStorage } from '../hooks/local-storage'

const enum BooleanString {
    true = 'true',
    false = 'false',
}

export const useBooleanLocalStorage = (
    key: string,
    defaultValue: boolean,
): [boolean | undefined, Dispatch<SetStateAction<boolean | undefined>>] => {
    return useLocalStorage({
        key,
        defaultValue,
        toString: boolean => {
            if (boolean) {
                return BooleanString.true
            }
            return BooleanString.false
        },
        fromString: string => string === BooleanString.true,
    })
}
