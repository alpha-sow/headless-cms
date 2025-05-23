<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <Toaster class="pointer-events-auto" />
  <RouterView></RouterView>
</template>

<style scoped></style>
