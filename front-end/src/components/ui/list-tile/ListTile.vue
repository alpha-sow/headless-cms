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
        <div>
          <h1 class="text-lg text-muted-foreground font-semibold">
            {{ title }}
          </h1>
          <p class="text-lg mt-1">{{ description }}</p>
        </div>
      </div>
      <slot name="trailing" />
    </div>
  </div>
</template>
