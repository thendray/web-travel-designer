import { createRouter, createWebHistory } from "vue-router";
import Card from "./components/own-cards/CreateCardForm.vue";
import HomePage from "./views/HomePage.vue";
import InitPage from "./views/InitPage.vue";
import Authorization from "./components/AuthorizationComp.vue";
import Registration from "./components/RegistrationComp.vue";
import SetRouteSettings from "./views/SetRouteSettings.vue";
import RouteRoom from "./views/RouteRoom.vue";
import RoomSettings from "./views/RoomSettings.vue";
// import { compile } from "vue";
import RoomMembers from "./views/RoomMembers.vue";
// import FullCard from "./components/cards/FullCard.vue";
import UserCardsPage from "./views/UserCardsPage.vue";
import VotePage from "./views/VotePage.vue";
import UserCabinetPage from "./views/UserCabinetPage.vue";
import WaitLoading from "./components/common/WaitLoading.vue";
// import RouteCard from "./components/home/RouteCard.vue";

const routes = [
  {
    path: "/home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-card",
    component: Card,
    meta: { requiresAuth: true },
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
  {
    path: "/create-route",
    component: SetRouteSettings,
    meta: { requiresAuth: true },
  },
  {
    path: "/route-room/:id",
    component: RouteRoom,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/route-room/:id/settings",
    component: RoomSettings,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/route-room/:id/members",
    component: RoomMembers,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/route-room/:id/own-cards",
    component: UserCardsPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/route-room/:id/vote",
    component: VotePage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/user-cabinet",
    component: UserCabinetPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/test",
    component: WaitLoading,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("jwt") != null;
  console.log("jwt", localStorage.getItem("jwt"));
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
