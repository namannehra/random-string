class TextFillsWidth {

    constructor(element, ratio) {
        this.element = element
        this.ratio = ratio
    }

    update() {
        this.element.style.fontSize = this.element.clientWidth / this.element.textContent.length / this.ratio + 'px'
    }

}

export default TextFillsWidth