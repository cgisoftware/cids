import { reactive } from "vue"

const cidsState = reactive({
  theme: {
    dataTable: {
      checkboxColor: '',
      lineColor: '',
    },
  },
  defaults: {
    dataTable: {
      acoes: 'right'
    }
  }
})

const useCids = () => {
  const setTheme = (theme) => {
    cidsState.theme = theme
  }

  const setDefaults = (defaults) => {
    cidsState.defaults = defaults
  }

  return {
    setTheme,
    setDefaults,
    cidsState
  }
}

export { useCids }