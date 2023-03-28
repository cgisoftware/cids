export const getInput = (el) => {
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        const input = el.getElementsByTagName('input')
        if (input.length > 0) {
            el = input[0]
            return el
        }

        const textArea = el.getElementsByTagName('textarea')
        if (textArea.length > 0) {
            el = textArea[0]
            return el
        }
    }
}