<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<template>
  <div class="flex flex-col items-center">
    <div class="text-2xl font-bold">{{ t("dashboard") }}</div>
    <div class="mt-4 text-gray-600">{{ t("welcome_to_the_dashboard") }}</div>
  </div>
</template>
