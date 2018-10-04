import Button from '@rmwc/button'
import Checkbox from '@rmwc/checkbox'
import Snackbar from '@rmwc/snackbar'
import TextField from '@rmwc/text-field'
import React, {Component, createRef} from 'react'

import FillWidth from './FillWidth'
import getRandomString from './getRandomString'
import objectMap from './objectMap'
import Range from './Range'

import '@material/button/dist/mdc.button.css'
import '@material/checkbox/dist/mdc.checkbox.css'
import '@material/floating-label/dist/mdc.floating-label.css'
import '@material/form-field/dist/mdc.form-field.css'
import '@material/line-ripple/dist/mdc.line-ripple.css'
import '@material/notched-outline/dist/mdc.notched-outline.css'
import '@material/snackbar/dist/mdc.snackbar.css'
import '@material/textfield/dist/mdc.textfield.css'
import './App.css'

class App extends Component {
    
    options = objectMap({
        lowercase: [true, 'a-z', [['a', 'z']]],
        uppercase: [true, 'A-Z', [['A', 'Z']]],
        numbers: [true, '0-9', [['0', '9']]],
        symbols: [false, '([{', [[' ', '/'], [':', '@'], ['[', '`'], ['{', '~']]],
    }, ([defaultValue, label, ranges]) => ({
        defaultValue,
        label,
        ranges: ranges.map(range => new Range(range[0], range[1])),
    }))
    
    state = Object.assign(objectMap(this.options, ({defaultValue}) => defaultValue), {
        headingWidth: 0,
        length: 16,
        string: ' ',
        copied: true,
        snackbarOpen: false,
    })

    headingRef = createRef()

    lengthRef = createRef()

    stringRef = createRef()

    handleResize = () => {
        this.lengthRef.current.layout()
        this.stringRef.current.layout()
        this.setState({headingWidth: this.headingRef.current.offsetWidth})
    }

    setOption(option, value) {
        localStorage.setItem(option, value)
        this.setState({[option]: value}, this.generateString)
    }

    handleLengthChange = event => {
        let length = Number(event.target.value)
        if (!Number.isInteger(length) || length < 0 || length > 65536) {
            length = 0
        }
        if (length !== this.state.length) {
            if (length) {
                localStorage.setItem('length', length)
            }
            this.setState({length}, this.generateString)
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        this.generateString()
    }

    generateString() {
        let allRanges = []
        for (const [option, {ranges}] of Object.entries(this.options)) {
            if (this.state[option]) {
                allRanges = allRanges.concat(ranges)
            }
        }
        this.setState({string: getRandomString(allRanges, this.state.length)})
    }

    handleCopyClick = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(this.state.string).then(() => true).catch(() => false).then(copied => {
                this.setState({
                    copied,
                    snackbarOpen: true,
                })
            })
        } else {
            const input = this.stringRef.current.input_
            input.select()
            const copied = document.execCommand('copy')
            this.setState({
                copied,
                snackbarOpen: true,
            })
            getSelection().empty()
            input.blur()
        }
    }

    handleSnackbarHide = () => {
        this.setState({snackbarOpen: false})
    }

    componentDidMount() {
        addEventListener('resize', this.handleResize)
        this.setState({headingWidth: this.headingRef.current.offsetWidth})
        const stateChange = {}
        for (const option of Object.keys(this.options)) {
            const item = localStorage.getItem(option)
            if (item) {
                stateChange[option] = item === 'true'
            }
        }
        const length = localStorage.getItem('length')
        if (length) {
            stateChange.length = Number(length)
            this.lengthRef.current.input_.value = length
        }
        this.setState(stateChange, this.generateString)
    }

    componentWillUnmount() {
        removeEventListener('resize', this.handleResize)
    }

    render() {
        return <>
            <header>
                <h1 ref={this.headingRef}>
                    <FillWidth width={this.state.headingWidth}>random-string</FillWidth>
                </h1>
            </header>
            <form onSubmit={this.handleSubmit}>
                {Object.entries(this.options).map(([option, {label}]) => (
                    <Checkbox
                        key={option}
                        checked={this.state[option]}
                        onChange={event => {
                            this.setOption(option, event.target.checked)
                        }}
                    >{label}</Checkbox>
                ))}
                <TextField
                    ref={this.lengthRef}
                    label="Length"
                    type="number"
                    min="1"
                    max="65536"
                    defaultValue={this.state.length}
                    onChange={this.handleLengthChange}
                    required
                    outlined
                    dense
                />
                <Button type="submit" unelevated>generate</Button>
            </form>
            <TextField
                ref={this.stringRef}
                className="string"
                label="String"
                value={this.state.string}
                readOnly
                outlined
                dense
            />
            <Button className="copy" disabled={!this.state.string} onClick={this.handleCopyClick} unelevated>copy</Button>
            <div className="flex"></div>
            <footer>
                <a href="https://github.com/namannehra/random-string" target="_blank">View source</a>
            </footer>
            <Snackbar
                message={this.state.copied ? 'Copied' : 'Copy failed'}
                show={this.state.snackbarOpen}
                onHide={this.handleSnackbarHide}
            />
        </>
    }

}

export default App