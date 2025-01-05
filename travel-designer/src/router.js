import { createRouter, createWebHistory } from "vue-router";
import Card from "./components/CreateCardForm.vue";
import HomePage from "./views/HomePage.vue";
import InitPage from "./views/InitPage.vue";
import Authorization from "./components/AuthorizationComp.vue";
import Registration from "./components/RegistrationComp.vue";

const routes = [
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/create-card",
    component: Card,
  },
  {
    path: "/",
    component: InitPage,
  },
  {
    path: "/login",
    component: Authorization,
  },
  {
    path: "/sign-up",
    component: Registration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
