import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import prismic from "./prismic";

createApp(App).use(prismic).mount("#app");
