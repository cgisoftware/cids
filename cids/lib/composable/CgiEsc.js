import { reactive } from 'vue';

const escStack = reactive([])

export function useEsc() {

  const add = (comp) => {
    escStack.push(comp)
  }

  const close = () => {
    if (!escStack.length) return
    escStack[escStack.length - 1].value = false
    escStack.pop()
  }

  return {
    add,
    close,
  };
}