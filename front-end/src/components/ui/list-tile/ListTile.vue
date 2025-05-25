<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <slot name="leading" />
        <h1 class="text-lg font-semibold">{{ title }}</h1>
      </div>
      <slot name="trailing" />
    </div>
    <p class="text-sm text-muted-foreground mt-1">{{ description }}</p>
  </div>
</template>
