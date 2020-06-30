import { getCryptoRandomNumbers } from '../utils/crypto-random-numbers'

export interface GetRandomStringOptions {
    length: number
    lowercase: boolean
    uppercase: boolean
    numbers: boolean
    symbols: boolean
}

export const getRandomString = (options: GetRandomStringOptions) => {
    const ranges: [string, string][] = []
    if (options.lowercase) {
        ranges.push(['a', 'z'])
    }
    if (options.uppercase) {
        ranges.push(['A', 'Z'])
    }
    if (options.numbers) {
        ranges.push(['0', '9'])
    }
    if (options.symbols) {
        ranges.push(['!', '/'], [':', '@'], ['[', '`'], ['{', '~'])
    }
    const numberRanges: [number, number][] = ranges.map(([start, end]) => [
        start.charCodeAt(0),
        end.charCodeAt(0),
    ])
    const numbers = getCryptoRandomNumbers(numberRanges, options.length)
    return numbers.map(number => String.fromCharCode(number)).join('')
}
