import { reactive } from 'vue';

const escStack = reactive([])

export function useEsc() {

  const add = (comp) => {
    escStack.push(comp)
  }

  const close = () => {
    if (!escStack.length) return

    const escHandler = escStack[escStack.length - 1]

    if (typeof escHandler === 'function') {
      escHandler()
    } else {
      escHandler.value = false
    }

    escStack.pop()
  }

  return {
    add,
    close,
  };
}
