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

const router = useRouter();

defineProps<{
  data: SidebarData;
}>();

function isActive(name: string): boolean {
  return router.currentRoute.value.name === name;
}
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <slot name="header">
            <SidebarMenuButton
              click=""
              size="lg"
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ data.name }}</span>
              </div>
            </SidebarMenuButton>
          </slot>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
              <SidebarMenuButton
                :class="{
                  'bg-sidebar-accent text-sidebar-accent-foreground': isActive(
                    item.urlName
                  ),
                }"
                @click="() => router.push({ name: item.urlName })"
                :tooltip="item.title"
              >
                <component :is="item.icon" />
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
