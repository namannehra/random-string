const getRandomNumbers = (max, length) => {
    const limit = Math.floor(255 / max) * max
    const randomNumbers = new Uint8Array(length)
    let filled = 0
    while (filled < length) {
        const left = length - filled
        const newRandomNumbers = new Uint8Array(left)
        crypto.getRandomValues(newRandomNumbers)
        for (const randomNumber of newRandomNumbers) {
            if (randomNumber < limit) {
                randomNumbers[filled] = randomNumber % max
                filled++
            }
        }
    }
    return randomNumbers
}

export default getRandomNumbers
