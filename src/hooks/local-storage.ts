import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

export interface UseLocalStorageOptions<T> {
    key: string
    defaultValue?: T
    toString: (value: T) => string
    fromString: (string: string) => T
}

export const useLocalStorage = <T>(
    options: UseLocalStorageOptions<T>,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {

    const [value, _setValue] = useState<T>()
    const [shouldReadFromStorage, setShouldReadFromStorage] = useState(true)
    const [ready, setReady] = useState(false)

    const writeToStorage = useCallback(() => {
        if (value === undefined) {
            localStorage.removeItem(options.key)
        } else {
            localStorage.setItem(options.key, options.toString(value))
        }
    }, [options.key, options.toString, value])

    useEffect(() => {
        if (!ready) {
            return
        }
        writeToStorage()
    }, [writeToStorage])

    const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(action => {
        setShouldReadFromStorage(false)
        _setValue(action)
    }, [setShouldReadFromStorage])

    useEffect(() => {
        if (shouldReadFromStorage) {
            const valueString = localStorage.getItem(options.key)
            if (valueString === null) {
                _setValue(options.defaultValue)
            } else {
                _setValue(options.fromString(valueString))
            }
        } else {
            writeToStorage()
        }
        setReady(true)
    }, [])

    return [value, setValue]

}
