import { useEsc } from "../composable/CgiEsc";

export default {
  mounted(el, binding) {
    const { add } = useEsc();
    add(binding.value)
  },
};