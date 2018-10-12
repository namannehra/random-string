class Range {

    constructor(start, end) {
        this.start = start.charCodeAt()
        this.end = end.charCodeAt()
        this.size = this.end - this.start + 1
    }

}

export default Range