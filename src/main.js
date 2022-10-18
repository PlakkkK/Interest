import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import filters from "../helpers/filters";
import fn from "../helpers/function";

const app = createApp(App);

app.config.globalProperties.$filters = filters;
app.config.globalProperties.$myGlobalVariable = fn;

app.mount("#app");
