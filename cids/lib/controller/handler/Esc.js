import { useEsc } from "../../composable/CgiEsc";

const { close } = useEsc()

const handleKeydown = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    close()
  }
};

const configEscEvent = () => {
  document.addEventListener('keydown', handleKeydown);
}

export { configEscEvent }