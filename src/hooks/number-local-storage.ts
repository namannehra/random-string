import { Dispatch, SetStateAction } from 'react'

import { useLocalStorage } from '../hooks/local-storage'

export const useNumberLocalStorage = (
    key: string,
    defaultValue: number,
): [number | undefined, Dispatch<SetStateAction<number | undefined>>] => {
    return useLocalStorage({
        key,
        defaultValue,
        toString: number => number.toString(),
        fromString: string => Number(string),
    })
}
