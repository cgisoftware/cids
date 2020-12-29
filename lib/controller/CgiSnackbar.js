export default class CgiSnackbarController {
    message = null
    snackbar = false
    timeout = 10000
    color = 'red'
    actions = {
      accept: false,
    }
    position = {
      right: true,
      center: true,
      top: false,
    }
    isConfirm = false
    context = null

    show({
      message,
      timeout = 10000,
      color = 'red',
      actions = { accept: false },
      position = {
        right: true,
        center: true,
        top: false,
      },
    }) {
      this.message = message
      this.timeout = timeout
      this.snackbar = true
      this.color = color
      this.actions = actions
      this.position = position
    }

    async confirm({
      message,
      timeout = 50000,
      color = 'green',
      actions = { accept: true },
      position = {
        right: true,
        center: false,
        top: true,
      },
    }) {
      this.message = message
      this.timeout = timeout
      this.snackbar = true
      this.color = color
      this.actions = actions
      this.position = position
      let handlerInterval
      const confirm = await new Promise(resolve => {
        const handlerTimeOut = setTimeout(() => {
           resolve(false)
        }, timeout)
        handlerInterval = setInterval(() => {
          if (this.isConfirm) {
            this.isConfirm = false
            clearTimeout(handlerTimeOut);
            resolve(true)
          }
        }, 500)
      });
      clearInterval(handlerInterval)
      return confirm
    }

    accept() {
      this.isConfirm = true
      this.snackbar = false
    }
  }