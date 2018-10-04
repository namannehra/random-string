import getRandomNumbers from './getRandomNumbers'

const getRandomString = (ranges, length) => {
    if (!ranges.length) {
        return ''
    }
    const totalSize = ranges.reduce((sum, range) => sum + range.size, 0)
    const randomNumbers = getRandomNumbers(totalSize, length)
    let string = ''
    for (let randomNumber of randomNumbers) {
        for (const range of ranges) {
            if (randomNumber <= range.size - 1) {
                string += String.fromCharCode(range.start + randomNumber)
                break
            }
            randomNumber -= range.size
        }
    }
    return string
}

export default getRandomString