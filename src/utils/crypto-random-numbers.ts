export const getCryptoRandomNumbers = (ranges: [number, number][], length: number) => {
    if (!ranges.length) {
        return []
    }
    const numbers = []
    let remaining = length
    while (remaining) {
        const currentNumbers = new Uint8Array(remaining)
        crypto.getRandomValues(currentNumbers)
        for (const number of currentNumbers) {
            if (ranges.some(([start, end]) => number >= start && number <= end)) {
                numbers.push(number)
                remaining--
            }
        }
    }
    return numbers
}
