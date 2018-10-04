const objectMap = (object, mapFunc) => {
    const newObject = {}
    for (const [key, value] of Object.entries(object)) {
        newObject[key] = mapFunc(value)
    }
    return newObject
}

export default objectMap