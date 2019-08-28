class Range {

    constructor(start, end) {
        this.start = start.charCodeAt()
        this.size = end.charCodeAt() - this.start + 1
    }

}

export default Range
