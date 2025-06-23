<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Card } from "@/components/ui/card";
const { t } = useI18n();
</script>
<template>
  <div class="grid grid-cols-3 gap-4">
    <Card class="w-[350px] h-[175px]"></Card>
    <Card class="w-[350px] h-[175px]"></Card>
    <Card class="w-[350px] h-[175px]"></Card>
    <Card class="w-[350px] h-[175px]"></Card>
    <Card class="w-[350px] h-[175px]"></Card>
    <Card class="w-[350px] h-[175px]"></Card>
    <Card class="w-[350px] h-[175px]"></Card>
    <Card class="w-[350px] h-[175px]"></Card>
  </div>
</template>
