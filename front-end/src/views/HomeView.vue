<script setup lang="ts">
import { RouterView } from "vue-router";
import Button from "@/components/ui/button/button.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import AppSideBar from "@/components/AppSideBar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const authStore = useAuthStore();

function logout() {
  authStore.logout();
}
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <SidebarProvider>
      <SidebarTrigger />
      <AppSideBar @logout="logout" />
      <RouterView></RouterView>
    </SidebarProvider>
  </div>
</template>
