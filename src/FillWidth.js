import React, {Component, createRef} from 'react'

class FillWidth extends Component {

    ref = createRef()

    update() {
        const {current} = this.ref
        const fontSize = Number.parseFloat(getComputedStyle(current).fontSize)
        if (fontSize && this.props.width) {
            const width = current.offsetWidth
            current.style.fontSize = fontSize * this.props.width / width + 'px'
        }
    }

    componentDidMount() {
        this.update()
    }

    componentDidUpdate() {
        this.update()
    }

    render() {
        return (
            <span ref={this.ref}>{this.props.children}</span>
        )
    }

}

export default FillWidth