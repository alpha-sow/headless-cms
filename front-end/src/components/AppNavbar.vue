<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useColorMode } from "@vueuse/core";
import Button from "@/components/ui/button/Button.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, CircleUser } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const mode = useColorMode();
const emit = defineEmits<{
  (e: "logout"): void;
}>();
</script>

<template>
  <nav class="flex items-center justify-between h-16 mr-6">
    <div></div>
    <div class="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        @click="mode === 'dark' ? (mode = 'light') : (mode = 'dark')"
      >
        <Sun v-if="mode === 'dark'" class="w-5 h-5" />
        <Moon v-if="mode === 'light'" class="w-5 h-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Avatar class="h-8 w-8 rounded-lg">
            <AvatarImage src="" alt="username" />
            <AvatarFallback class="rounded-lg">
              <CircleUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="bottom"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt="username" />
                <AvatarFallback class="rounded-lg">
                  <CircleUser />
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">username</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="router.push('/settings/profile')">
            <span class="text-sm">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="emit('logout')">
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>
