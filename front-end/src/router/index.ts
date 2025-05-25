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
          component: () => import("@/views/ProfileView.vue"),
          meta: { title: "Profile Settings" },
        },
        {
          path: "users",
          component: () => import("@/views/UsersView.vue"),
          meta: { title: "Users" },
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
