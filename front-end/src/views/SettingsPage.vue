<script setup lang="ts">
import { RouterView } from "vue-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { SidebarData } from "@/views/utils";
import { CircleUser, User } from "lucide-vue-next";
import AppSideBar from "@/components/AppSideBar.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import { useRouter } from "vue-router";
import { CircleArrowLeft } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const router = useRouter();

const data: SidebarData = {
  name: "Settings",
  navMain: [
    {
      title: t("profile"),
      url: "/settings/profile",
      icon: CircleUser,
    },
    {
      title: t("users"),
      url: "/settings/users",
      icon: User,
    },
  ],
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <SidebarProvider>
      <SidebarTrigger />
      <AppSideBar :data="data">
        <template #header>
          <SidebarMenuButton @click="router.push('/dashboard')">
            <CircleArrowLeft />
            {{ t("back") }}
          </SidebarMenuButton>
        </template>
      </AppSideBar>
      <div class="flex flex-col w-full h-full">
        <AppNavbar />
        <RouterView></RouterView>
      </div>
    </SidebarProvider>
  </div>
</template>
