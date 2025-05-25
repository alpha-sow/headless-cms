<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { SidebarData } from "@/views/utils";
import { CircleUser, User } from "lucide-vue-next";
import AppSideBar from "@/components/AppSideBar.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import { useRouter } from "vue-router";
import { CircleArrowLeft } from "lucide-vue-next";

const authStore = useAuthStore();

const router = useRouter();

const data: SidebarData = {
  name: "Settings",
  navMain: [
    {
      title: "Profile",
      url: "/settings/profile",
      icon: CircleUser,
    },
    {
      title: "Users",
      url: "/settings/users",
      icon: User,
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
        <template #header>
          <SidebarMenuButton @click="router.push('/dashboard')">
            <CircleArrowLeft />
            Back
          </SidebarMenuButton>
        </template>
      </AppSideBar>
      <div class="flex flex-col w-full h-full">
        <AppNavbar @logout="logout" />
        <RouterView></RouterView>
      </div>
    </SidebarProvider>
  </div>
</template>
