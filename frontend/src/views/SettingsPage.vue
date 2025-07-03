<script setup lang="ts">
import { RouterView } from "vue-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { SidebarData } from "@/views/utils";
import AppNavbar from "@/components/AppNavbar.vue";
import { CircleUser, User } from "lucide-vue-next";
import AppSideBar from "@/components/AppSideBar.vue";
import SidebarMenuButton from "@/components/ui/sidebar/SidebarMenuButton.vue";
import { useRouter } from "vue-router";
import { CircleArrowLeft } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { useQuery } from "@tanstack/vue-query";
import { authenticationUser } from "@/services";

const { t } = useI18n();

const router = useRouter();

const { data } = useQuery({
  queryKey: ["authUser"],
  queryFn: authenticationUser,
});

const sidebarData: SidebarData = [
  {
    key: "profile",
    title: t("profile"),
    urlName: "settingsProfile",
    icon: CircleUser,
  },
  {
    key: "users",
    title: t("users"),
    urlName: "settingsUsersList",
    icon: User,
  },
];
</script>

<template>
  <SidebarProvider>
    <AppSideBar v-if="data" :sidebarContent="sidebarData" :user="data">
      <template #header>
        <SidebarMenuButton
          @click="router.push({ name: 'root' })"
          :tooltip="t('back')"
        >
          <CircleArrowLeft />
          {{ t("back") }}
        </SidebarMenuButton>
      </template>
    </AppSideBar>
    <SidebarTrigger class="fixed top-4 left-4" />
    <main class="w-full">
      <AppNavbar />
      <RouterView class="p-4" />
    </main>
  </SidebarProvider>
</template>
