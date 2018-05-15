import {MDCFormField} from '@material/form-field'
import {MDCCheckbox} from '@material/checkbox'
import {MDCTextField} from '@material/textfield'
import {MDCRipple} from '@material/ripple'
import {MDCSnackbar, MDCSnackbarFoundation} from '@material/snackbar'

import './manifest.webmanifest'
import './style.sass'

import {Range, RangeSet} from './range'

const characters = new RangeSet()
let length = 24
const stringEle = document.querySelector('#string')

const initTitle = () => {
    const titleEle = document.querySelector('h1')
    const titleLength = titleEle.textContent.length
    const handleResize = () => {
        const titleWidth = titleEle.clientWidth
        /* browser support */
        // titleEle.attributeStyleMap.set('font-size', (titleWidth - 4) / titleLength / 0.6 + 'px')
        titleEle.style.fontSize = (titleWidth - 4) / titleLength / 0.6 + 'px'
    }
    addEventListener('resize', handleResize)
    handleResize()
}
initTitle()

const initCheckBoxes = () => {
    const data = {
        lower: {
            defaultChecked: true,
            ranges: [new Range('a', 'z')],
        },
        upper: {
            defaultChecked: true,
            ranges: [new Range('A', 'Z')],
        },
        numbers: {
            defaultChecked: true,
            ranges: [new Range('0', '9')],
        },
        symbols: {
            defaultChecked: false,
            ranges: [new Range('!', '/'), new Range(':', '@'), new Range('[', '`'), new Range('{', '~')],
        },
    }
    for (const [key, {defaultChecked, ranges}] of Object.entries(data)) {
        const str = localStorage.getItem(key)
        const ele = document.querySelector('#' + key)
        if (str === null) {
            ele.checked = defaultChecked
        } else {
            ele.checked = str === 'true'
        }
        if (ele.checked) {
            for (const range of ranges) {
                characters.add(range)
            }
        }
        ele.addEventListener('change', () => {
            if (ele.checked) {
                localStorage.setItem(key, 'true')
                for (const range of ranges) {
                    characters.add(range)
                }
            } else {
                localStorage.setItem(key, 'false')
                for (const range of ranges) {
                    characters.remove(range)
                }
            }
            generate()
        })
    }
    for (const checkboxContainer of document.querySelectorAll('.checkbox-container')) {
        const formField = new MDCFormField(checkboxContainer)
        const checkbox = new MDCCheckbox(checkboxContainer.querySelector('.mdc-checkbox'))
        formField.input = checkbox
    }
}
initCheckBoxes()

const initLength = () => {
    const str = localStorage.getItem('length')
    if (str) {
        length = Number(str)
    }
    const ele = document.querySelector('#length')
    ele.value = str
    ele.addEventListener('input', () => {
        if (ele.validity.valid) {
            length = Number(ele.value)
            localStorage.setItem('length', length)
        } else {
            length = 0
        }
        generate()
    })
}
initLength()

const generate = () => {
    if (characters.size) {
        let str = ''
        for (let i = 0; i < length; i++) {
            str += characters.random()
        }
        stringEle.value = str
    } else {
        stringEle.value = ''
    }
}
generate()

/* TextFields breaks on resize */
const initTextFields = () => {
    const textFields = []
    for (const textField of document.querySelectorAll('.mdc-text-field')) {
        textFields.push(new MDCTextField(textField))
    }
    addEventListener('resize', () => {
        for (const textField of textFields) {
            textField.layout()
        }
    })
}
initTextFields()

const generateEle = document.querySelector('#generate')
generateEle.addEventListener('click', generate)

const copyEle = document.querySelector('#copy')
copyEle.addEventListener('click', () => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(stringEle.value).then(() => {
            snackbar.show({
                message: 'Copied'
            })
        }).catch(() => {
            snackbar.show({
                message: 'Copy failed'
            })
        })
    } else {
        /* browser support */
        stringEle.focus()
        stringEle.select()
        const copied = document.execCommand('copy')
        snackbar.show({
            message: copied ? 'Copied' : 'Copy failed'
        })
    }
})

for (const button of document.querySelectorAll('.mdc-button')) {
    new MDCRipple(button)
}

const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'))