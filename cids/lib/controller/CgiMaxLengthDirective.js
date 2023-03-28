import { getInput } from "./handler/GetInput";

let callback;


export default {
    install(Vue) {
        Vue.directive('cgi-max-length', {
            bind(el, binding) {
                el = getInput(el)

                const maxLength = binding.expression;
                callback = (e) => {
                    if (e.target.value.length > maxLength) {
                        e.target.value = e.target.value.substr(0, maxLength);

                        const event = new Event("input", { "bubbles": true, "cancelable": true });
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