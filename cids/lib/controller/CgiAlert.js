export default class CgiAlertController {
  constructor() {
    this.message = null;
    this.timeout = 10000;
    this.color = "red";
    this.actions = {
      accept: false,
    };
    this.isConfirm = false;
    this.context = null;
    this.dialog = false;
    this.isDecline = false
  }

  show({ message, color = "red", actions = { accept: false } }) {
    this.message = message;
    this.dialog = true;
    this.color = color;
    this.actions = actions;
  }

  async confirm({
    message,
    timeout = 50000,
    color = "green",
    actions = { accept: true },
  }) {
    this.message = message;
    this.timeout = timeout;
    this.dialog = true;
    this.color = color;
    this.actions = actions;
    let handlerInterval;
    const confirm = await new Promise((resolve) => {
      const handlerTimeOut = setTimeout(() => {
        resolve(false);
      }, timeout);
      handlerInterval = setInterval(() => {
        if (this.isConfirm) {
          this.isConfirm = false;
          clearTimeout(handlerTimeOut);
          resolve(true);
        }
        if (this.isDecline) {
          this.isDecline = false
          clearTimeout(handlerTimeOut)
          resolve(false)
        }
      }, 500);
    });
    clearInterval(handlerInterval);
    return confirm;
  }

  accept() {
    this.isConfirm = true;
    this.dialog = false;
  }

  decline() {
    this.isDecline = true
    this.dialog = false
  }
}
