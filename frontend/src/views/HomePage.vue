<script setup lang="ts">
import { RouterView } from "vue-router";
import AppSideBar from "@/components/AppSideBar.vue";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppNavbar from "@/components/AppNavbar.vue";
import { Home, Settings } from "lucide-vue-next";
import type { SidebarData } from "@/views/utils";
import { useRouter } from "vue-router";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const router = useRouter();
const data: SidebarData = {
  versions: ["0.0.1"],
  name: t("headless_ui"),
  navMain: [
    {
      title: t("dashboard"),
      urlName: "homeDashboard",
      icon: Home,
    },
  ],
};
</script>
<template>
  <SidebarProvider>
    <AppSideBar :data="data">
      <template #footer>
        <SidebarMenuButton @click="router.push({ name: 'settings' })">
          <Settings /> {{ t("settings") }}
        </SidebarMenuButton>
        <h1 class="text-end text-xs py-4">Version: {{ data.versions![0] }}</h1>
      </template>
    </AppSideBar>
    <main class="w-full">
      <AppNavbar />
      <RouterView class="p-4" />
    </main>
  </SidebarProvider>
</template>
