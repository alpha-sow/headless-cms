import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import { currentCredential } from "@/services/AuthService";

import HomeView from "@/views/HomeView.vue";
import { setItem } from "@/services/LocalStorage";
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    { path: "/login", component: () => import("@/views/LoginView.vue") },
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
