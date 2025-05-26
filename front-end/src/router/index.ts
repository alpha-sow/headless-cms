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
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          component: () => import("@/views/DashboardView.vue"),
          meta: { title: "Dashboard" },
        },
      ],
    },
    {
      path: "/settings",
      component: () => import("@/views/SettingsPage.vue"),
      meta: { title: "Settings" },
      redirect: "/settings/profile",
      children: [
        {
          path: "profile",
          component: () => import("@/views/SettingsProfileView.vue"),
          meta: { title: "Profile Settings" },
        },
        {
          path: "users",
          meta: { title: "Users" },
          component: () => import("@/views/UserPage.vue"),
          redirect: "/settings/users",
          children: [
            {
              path: "",
              component: () => import("@/views/SettingsUsersView.vue"),
              meta: { title: "Users List" },
            },
            {
              path: ":username",
              component: () => import("@/views/SettingsUsersDetailView.vue"),
              meta: { title: "User Detail" },
              props: true,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
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
