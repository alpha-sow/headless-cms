<script setup lang="ts">
import { defineProps } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <input
    id="avatarField"
    :class="
      cn(
        'file:cursor-pointer file:p-2 file:rounded-md file:border-0 file:bg-gray-100 ',
        'file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200',
        ' dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600',
        props.class
      )
    "
    type="file"
  />
</template>
