import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { i18n } from "@/i18n";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueQueryPlugin)
  .use(i18n)
  .mount("#app");
