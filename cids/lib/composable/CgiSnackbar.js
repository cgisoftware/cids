import { reactive } from 'vue'

const snackbarState = reactive({
  message: null,
  snackbar: false,
  timeout: 10000,
  color: 'red',
  actions: {
    accept: false,
  },
  position: 'top center',
  isConfirm: false,
  isDecline: false
})


const useSnackbar = () => {
  const show = ({
    message,
    timeout = 10000,
    color = 'red',
    actions = { accept: false, show: true },
    position = 'top center',
  }) => {
    snackbarState.message = message
    snackbarState.timeout = timeout
    snackbarState.snackbar = true
    snackbarState.color = color
    snackbarState.actions = actions
    snackbarState.position = position
  }

  const confirm = async ({
    message,
    timeout = 50000,
    color = 'green',
    actions = { accept: true },
    position = 'top end',
  }) => {
    snackbarState.message = message
    snackbarState.timeout = timeout
    snackbarState.snackbar = true
    snackbarState.color = color
    snackbarState.actions = actions
    snackbarState.position = position
    snackbarState.isConfirm = false
    snackbarState.isDecline = false
    let handlerInterval = {}

    const confirm = await new Promise((resolve) => {
      const handlerTimeOut = setTimeout(() => {
        resolve(false)
      }, timeout)
      handlerInterval = setInterval(() => {
        if (snackbarState.isConfirm) {
          snackbarState.isConfirm = false
          clearTimeout(handlerTimeOut)
          clearInterval(handlerInterval)
          resolve(true)
        }
        if (snackbarState.isDecline) {
          snackbarState.isDecline = false
          clearTimeout(handlerTimeOut)
          clearInterval(handlerInterval)
          resolve(false)
        }
      }, 200)
    })
    return confirm
  }

  const accept = () => {
    snackbarState.isConfirm = true
    snackbarState.snackbar = false
  }

  const decline = () => {
    snackbarState.isDecline = true
    snackbarState.snackbar = false
  }

  return {
    snackbarState,
    show,
    confirm,
    accept,
    decline
  }
}

export { useSnackbar }