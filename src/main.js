import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import filters from "../helpers/filters";

const app = createApp(App);

app.config.globalProperties.$filters = filters;

app.mount("#app");
