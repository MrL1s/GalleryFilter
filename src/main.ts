import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "@/assets/styles/tailwind.css"; // Tailwind
import "@/assets/styles/main.scss"; // global SASS style

createApp(App).use(router).mount("#app");
