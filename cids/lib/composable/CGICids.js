import { provide, inject, reactive } from "vue";

const useCidsProvider = () => {
  const cidsState = reactive({
    theme: {
      dataTable: {
        checkboxColor: "",
        lineColor: "",
      },
    },
    defaults: {
      dataTable: {
        acoes: "right",
      },
    },
  });

  const setTheme = (theme) => {
    cidsState.theme = theme;
  };

  const setDefaults = (defaults) => {
    cidsState.defaults = defaults;
  };

  provide("useCids", {
    setTheme,
    setDefaults,
    cidsState,
  });

  return {
    setTheme,
    setDefaults,
    cidsState,
  };
};

const useCids = () => {
  const cids = inject("useCids");

  if (!cids) {
    throw new Error("useCids must be used within a CidsProvider");
  }

  return cids;
};

export { useCidsProvider, useCids };
