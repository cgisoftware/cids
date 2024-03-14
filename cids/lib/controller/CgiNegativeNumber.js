import { getInput } from "./handler/GetInput";

let callback;

function containsOnlyNumbers(str) {
  if (str === "") {
    return true;
  }
  return /^\d+$/.test(str);
}

export default {
  install(Vue) {
    Vue.directive("cgi-negative-number", {
      mounted(el, binding) {
        el = getInput(el);
        const habilitado = binding.value ?? true;

        if (habilitado) {
          callback = (e) => {
            if (!containsOnlyNumbers(e.target.value)) {
              const value = e.target.value.replace(/\D+/g, "");
              e.target.value = value ? parseInt(value) : null;

              const event = new Event("input", {
                bubbles: true,
                cancelable: true,
              });
              e.target.dispatchEvent(event);
            }
          };

          el.addEventListener("input", callback);
        }
      },
      beforeUnmount(el) {
        el.removeEventListener("input", callback);
      },
    });
  },
};
