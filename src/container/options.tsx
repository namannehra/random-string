import { createContainer } from 'unstated-next'

import { useBooleanLocalStorage } from '../hooks/boolean-local-storage'
import { useNumberLocalStorage } from '../hooks/number-local-storage'

const useOptions = () => {

    const [lowercase, setLowercase] = useBooleanLocalStorage('lowercase', true)
    const [uppercase, setUppercase] = useBooleanLocalStorage('uppercase', true)
    const [numbers, setNumbers] = useBooleanLocalStorage('numbers', true)
    const [symbols, setSymbols] = useBooleanLocalStorage('symbols', false)
    const [length, setLength] = useNumberLocalStorage('length', 16)

    return {
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
    }

}

export const OptionsContainer = createContainer(useOptions)
