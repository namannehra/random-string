import {MDCFormField} from '@material/form-field'
import {MDCCheckbox} from '@material/checkbox'
import {MDCTextField} from '@material/textfield'
import {MDCRipple} from '@material/ripple'
import {MDCSnackbar} from '@material/snackbar'

import FillWidthWithText from './FillWidthWithText'
import objectMap from './objectMap'
import Range from './Range'
import getRandomString from './getRandomString'
import './style.sass'

const headingFillWidthWithText = new FillWidthWithText(document.querySelector('h1'), 0.6)
headingFillWidthWithText.update()

const form = document.querySelector('form')
form.addEventListener('submit', event => {
    event.preventDefault()
    generateString()
})

const options = objectMap({
    lowercase: [['a', 'z']],
    uppercase: [['A', 'Z']],
    numbers: [['0', '9']],
    symbols: [['!', '/'], [':', '@'], ['[', '`'], ['{', '~']],
}, ranges => ({
    ranges: ranges.map(range => new Range(range[0], range[1])),
}))

for (const [name, option] of Object.entries(options)) {
    const checkbox = document.querySelector('#' + name)
    const checked = localStorage.getItem(name)
    if (checked) {
        checkbox.checked = checked === 'true'
    }
    checkbox.addEventListener('change', () => {
        localStorage.setItem(name, checkbox.checked)
        generateString()
    })
    new MDCCheckbox(checkbox.parentElement)
    new MDCFormField(checkbox.parentElement.parentElement)
    option.checkbox = checkbox
}

let length = 16
const lengthString = localStorage.getItem('length')
if (lengthString) {
    length = Number(lengthString)
}
const lengthInput = document.querySelector('#length')
lengthInput.value = length
lengthInput.addEventListener('input', () => {
    let newLength = Number(lengthInput.value)
    if (!Number.isInteger(newLength) || newLength < 0 || newLength > 65536) {
        newLength = 0
    }
    if (newLength !== length) {
        length = newLength
        if (length) {
            localStorage.setItem('length', length)
        }
        generateString()
    }
})
const lengthTextField = new MDCTextField(lengthInput.parentElement)

for (const button of document.querySelectorAll('.mdc-button')) {
    new MDCRipple(button)
}

const getString = () => {
    let allRanges = []
    for (const {checkbox, ranges} of Object.values(options)) {
        if (checkbox.checked) {
            allRanges = allRanges.concat(ranges)
        }
    }
    return getRandomString(allRanges, length)
}
const stringInput = document.querySelector('#string')
stringInput.value = getString()
const stringTextField = new MDCTextField(stringInput.parentElement)

addEventListener('resize', () => {
    headingFillWidthWithText.update()
    lengthTextField.layout()
    stringTextField.layout()
})

const generateString = () => {
    stringTextField.value = getString()
}

const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'))

const copyButton = document.querySelector('#copy')
copyButton.addEventListener('click', () => {
    /* input.select() doesn't work on iOS Safari */
    stringInput.setSelectionRange(0, length)
    const copied = document.execCommand('copy')
    getSelection().empty()
    snackbar.show({message: copied ? 'Copied' : 'Copy failed'})
})