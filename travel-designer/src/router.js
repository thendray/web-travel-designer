import { createRouter, createWebHistory } from "vue-router";
import Card from "./components/CreateCardForm.vue";
import HomePage from "./views/HomePage.vue";
import InitPage from "./views/InitPage.vue";
import Authorization from "./components/AuthorizationComp.vue";
import Registration from "./components/RegistrationComp.vue";
import SetRouteSettings from "./views/SetRouteSettings.vue";
import RouteRoom from "./views/RouteRoom.vue";
import RoomSettings from "./views/RoomSettings.vue";
// import { compile } from "vue";
import RoomMembers from "./views/RoomMembers.vue";

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
  {
    path: "/create-route",
    component: SetRouteSettings,
  },
  {
    path: "/route-room/:id",
    component: RouteRoom,
    props: true,
  },
  {
    path: "/route-room/:id/settings",
    component: RoomSettings,
    props: true,
  },
  {
    path: "/route-room/:id/members",
    component: RoomMembers,
    props: true,
  },
  {
    path: "/test",
    component: RoomMembers,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
