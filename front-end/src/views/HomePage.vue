<script setup lang="ts">
import { RouterView } from "vue-router";
import AppSideBar from "@/components/AppSideBar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
      url: "/dashboard",
      icon: Home,
    },
  ],
};
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <SidebarProvider>
      <SidebarTrigger />
      <AppSideBar :data="data">
        <template #footer>
          <SidebarMenuButton @click="router.push('/settings')">
            <Settings /> {{ t("settings") }}
          </SidebarMenuButton>
          <h1 class="text-end text-xs py-4">
            Version: {{ data.versions![0] }}
          </h1>
        </template>
      </AppSideBar>
      <div class="flex flex-col w-full h-full">
        <AppNavbar />
        <RouterView></RouterView>
      </div>
    </SidebarProvider>
  </div>
</template>
