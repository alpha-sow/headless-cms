<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import AppSideBar from "@/components/AppSideBar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppNavbar from "@/components/AppNavbar.vue";
import { Home, Settings } from "lucide-vue-next";
import type { SidebarData } from "@/views/utils";
import { useRouter } from "vue-router";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";

const authStore = useAuthStore();

const router = useRouter();

const data: SidebarData = {
  versions: ["0.0.1"],
  name: "Headless UI",
  navMain: [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: Home,
    },
  ],
};

function logout(): void {
  authStore.logout();
}
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <SidebarProvider>
      <SidebarTrigger />
      <AppSideBar :data="data">
        <template #footer>
          <SidebarMenuButton @click="router.push('/settings')">
            <Settings /> Settings
          </SidebarMenuButton>
          <h1 class="text-end text-xs py-4">
            Version: {{ data.versions![0] }}
          </h1>
        </template>
      </AppSideBar>
      <div class="flex flex-col w-full h-full">
        <AppNavbar @logout="logout" />
        <RouterView></RouterView>
      </div>
    </SidebarProvider>
  </div>
</template>
