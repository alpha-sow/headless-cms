import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import { currentCredential } from "@/services/AuthService";
import HomePage from "@/views/HomePage.vue";
import { setItem } from "@/services/LocalStorage";
import SettingsProfileView from "@/views/SettingsProfileView.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import SettingsUsersPage from "@/views/SettingsUsersPage.vue";
import SettingsUsersView from "@/views/SettingsUsersView.vue";
import SettingsUsersDetailView from "@/views/SettingsUsersDetailView.vue";
import HomeDashboardView from "@/views/HomeDashboardView.vue";
import LoginPage from "@/views/LoginPage.vue";
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: HomePage,
      redirect: "/home/dashboard",
      children: [
        {
          path: "dashboard",
          name: "homeDashboard",
          component: HomeDashboardView,
          meta: { title: "Dashboard" },
        },
      ],
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsPage,
      meta: { title: "Settings" },
      redirect: "/settings/profile",
      children: [
        {
          path: "profile",
          name: "settingsProfile",
          component: SettingsProfileView,
          meta: { title: "Profile Settings" },
        },
        {
          path: "users",
          name: "settingsUsers",
          meta: { title: "Users" },
          component: SettingsUsersPage,
          redirect: "/settings/users",
          children: [
            {
              path: "",
              name: "settingsUsersList",
              component: SettingsUsersView,
              meta: { title: "Users List" },
            },
            {
              path: ":username",
              name: "settingsUsersDetail",
              component: SettingsUsersDetailView,
              meta: { title: "User Detail" },
              props: true,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: { title: "Login" },
    },
  ],
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const publicPages = ["/login"];
    const isAuthRequired = !publicPages.includes(to.path);
    const isAuthenticated = currentCredential() != null;
    if (!isAuthRequired && isAuthenticated) {
      next({ path: "/" });
    } else if (isAuthRequired && !isAuthenticated) {
      setItem("returnUrl", to.fullPath);
      next({ path: "/login" });
    } else {
      next();
    }
  }
);

export default router;
