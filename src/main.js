import { registerPlugins } from "@/plugins";
import router from "./router";
import App from "./App.vue";

import { createApp } from "vue";

const app = createApp(App);

registerPlugins(app);

app.use(router);
app.mount("#app");
