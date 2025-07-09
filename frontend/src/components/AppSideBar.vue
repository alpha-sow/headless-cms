<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import type { SidebarData } from "@/views/utils";
import { useRouter } from "vue-router";
import { sideBarAccess } from "@/views/utils";
import type { UserInfo } from "@/models";

const router = useRouter();

defineProps<{
  sidebarContent: SidebarData;
  user?: UserInfo;
}>();

function isActive(name: string): boolean {
  return router.currentRoute.value.name === name;
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <slot name="header"> </slot>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in sidebarContent" :key="item.key">
              <SidebarMenuButton
                v-if="sideBarAccess(item.key, user)"
                :class="{
                  'bg-sidebar-accent text-sidebar-accent-foreground': isActive(
                    item.urlName
                  ),
                }"
                @click="() => router.push({ name: item.urlName })"
                :tooltip="item.title"
              >
                <component :is="item.icon" :size="32" />
                {{ item.title }}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <slot name="footer"></slot>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
