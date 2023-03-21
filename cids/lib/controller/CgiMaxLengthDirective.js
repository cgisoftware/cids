let callback;

const getInput = (el) => {
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        const els = el.getElementsByTagName('input')
        if (els.length !== 1) {
            throw new Error(`v-cleave requires 1 input, found ${els.length}`)
        } else {
            el = els[0]
        }
    }
    return el
}

export default {
    install(Vue) {
        Vue.directive('cgi-max-length', {
            bind(el, binding) {
                el = getInput(el)
               
                const maxLength = binding.expression;
                callback = (e) => {
                    console.log(e);
                    if (e.target.value.length > maxLength) {
                        e.target.value = e.target.value.substr(0, maxLength);

                        const event = new Event("input", {"bubbles":true, "cancelable":true});
                        // event.dispatchEvent('input', true, true);
                        e.target.dispatchEvent(event);
                    }
                };
                el.addEventListener('input', callback);
            },
            unbind(el) {
                el.removeEventListener('input', callback);
            }
        });
    }
};