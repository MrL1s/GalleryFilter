import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "@/assets/styles/tailwind.css"; // Tailwind
import "@/assets/styles/main.scss"; // глобальные SASS стили

// оставь свой импорт стилей как у тебя настроено:
// например: import "@/assets/main.css";  или  import "@/assets/main.scss";

createApp(App).use(router).mount("#app");
