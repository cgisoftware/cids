import { reactive, provide, inject } from "vue";

const useAlertProvider = () => {
  const alertState = reactive({
    message: null,
    timeout: 10000,
    color: "red",
    actions: {
      accept: false,
    },
    isConfirm: false,
    context: null,
    dialog: false,
    isDecline: false,
  });

  const show = ({ message, color = "red", actions = { accept: false } }) => {
    alertState.message = message;
    alertState.dialog = true;
    alertState.color = color;
    alertState.actions = actions;
  };

  const confirm = async ({
    message,
    timeout = 50000,
    color = "green",
    actions = { accept: true },
  }) => {
    alertState.message = message;
    alertState.timeout = timeout;
    alertState.dialog = true;
    alertState.color = color;
    alertState.actions = actions;
    alertState.isConfirm = false;
    alertState.isDecline = false;
    let handlerInterval = {};

    const confirm = await new Promise((resolve) => {
      const handlerTimeOut = setTimeout(() => {
        resolve(false);
      }, timeout);
      handlerInterval = setInterval(() => {
        if (alertState.isConfirm) {
          alertState.isConfirm = false;
          clearTimeout(handlerTimeOut);
          clearInterval(handlerInterval);
          resolve(true);
        }
        if (alertState.isDecline) {
          alertState.isDecline = false;
          clearTimeout(handlerTimeOut);
          clearInterval(handlerInterval);
          resolve(false);
        }
      }, 200);
    });
    return confirm;
  };

  const accept = () => {
    alertState.isConfirm = true;
    alertState.dialog = false;
  };

  const decline = () => {
    alertState.isDecline = true;
    alertState.dialog = false;
  };

  provide("useAlert", {
    show,
    accept,
    decline,
    confirm,
    alertState,
  });

  return {
    show,
    accept,
    decline,
    confirm,
    alertState,
  };
};

const useAlert = () => {
  const alert = inject("useAlert");

  if (!alert) {
    console.error("useAlert must be used within an AlertProvider");
  }

  return alert;
};

export { useAlertProvider, useAlert };
