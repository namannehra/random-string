class Range {
    constructor(start, end) {
        this._start = start.charCodeAt()
        this._end = end.charCodeAt()
        if (!(this._start <= this._end)) {
            throw new Error(`Start is not less of equal to end. start: ${start}, end: ${end}`)
        }
        this._size = this._end - this._start + 1
    }
    get start() {
        return String.fromCharCode(this._start)
    }
    get end() {
        return String.fromCharCode(this._end)
    }
    toString() {
        return `start: ${this.start}, end: ${this.end}`
    }
    equal(other) {
        return this._start === other._start && this._end === other._end
    }
    overlap(other) {
        return this._start <= other._end && this._end >= other._start
    }
}

class RangeSet {
    constructor() {
        this._size = 0
        this._ranges = new Set()
    }
    add(range) {
        for (const existingRange of this._ranges) {
            if (range.overlap(existingRange)) {
                throw new Error(`Overlapping range added. existing: {${existingRange}}, added: {${range}}`)
            }
        }
        this._ranges.add(range)
        this._size += range._size
    }
    remove(range) {
        for (const existingRange of this._ranges) {
            if (range.equal(existingRange)) {
                this._ranges.delete(existingRange)
                this._size -= existingRange._size
                break
            }
        }
    }
    random() {
        let randomNumber = Math.floor(Math.random() * this._size)
        for (const existingRange of this._ranges) {
            if (randomNumber <= existingRange._size - 1) {
                return String.fromCharCode(existingRange._start + randomNumber)
            }
            randomNumber -= existingRange._size
        }
    }
}

export {Range, RangeSet}