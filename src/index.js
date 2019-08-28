import {MDCFormField} from '@material/form-field'
import {MDCCheckbox} from '@material/checkbox'
import {MDCTextField} from '@material/textfield'
import {MDCRipple} from '@material/ripple'
import {MDCSnackbar} from '@material/snackbar'

import TextFillsWidth from './TextFillsWidth'
import Range from './Range'
import getRandomString from './getRandomString'
import './style.sass'

{
    const heading = document.querySelector('h1')
    const headingFillsWidth = new TextFillsWidth(heading, 0.6)
    headingFillsWidth.update()
    addEventListener('resize', () => {
        headingFillsWidth.update()
    })
}

{
    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
        event.preventDefault()
        updateString()
    })
}

const checkboxes = [
    ['lowercase', true, [['a', 'z']]],
    ['uppercase', true, [['A', 'Z']]],
    ['numbers', true, [['0', '9']]],
    ['symbols', false, [['!', '/'], [':', '@'], ['[', '`'], ['{', '~']]],
].map(([name, defaultChecked, range]) => {
    const checkbox = document.querySelector('#' + name)
    const checkedString = localStorage.getItem(name)
    if (checkedString === 'true') {
        checkbox.checked = true
    } else if (checkedString === 'false') {
        checkbox.checked = false
    } else {
        checkbox.checked = defaultChecked
    }
    checkbox.addEventListener('change', () => {
        localStorage.setItem(name, checkbox.checked)
        updateString()
    })
    new MDCCheckbox(checkbox.parentElement)
    new MDCFormField(checkbox.parentElement.parentElement)
    return [checkbox, range.map(([start, end]) => new Range(start, end))]
})

let length = Number(localStorage.getItem('length')) || 16

{
    const lengthInput = document.querySelector('#length-input')
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
            updateString()
            copyButton.disabled = !length
        }
    })
    new MDCTextField(lengthInput.parentElement)
}

const getString = () => {
    const ranges = checkboxes.filter(([checkbox]) => checkbox.checked).map(([_, ranges]) => ranges)
    return getRandomString([].concat(...ranges), length)
}

const stringTextField = (() => {
    const stringInput = document.querySelector('#string-input')
    stringInput.value = getString()
    return new MDCTextField(stringInput.parentElement)
})()

const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'))

const copyButton = document.querySelector('#copy')
copyButton.addEventListener('click', () => {
    const stringInput = stringTextField.input_
    stringInput.focus()
    /* input.select() doesn't work on iOS Safari */
    stringInput.setSelectionRange(0, length)
    const copied = document.execCommand('copy')
    getSelection().empty()
    copyButton.focus()
    snackbar.labelText = copied ? 'Copied' : 'Copy failed'
    snackbar.open()
})

for (const button of document.querySelectorAll('.mdc-button')) {
    new MDCRipple(button)
}

const updateString = () => {
    stringTextField.value = getString()
}
