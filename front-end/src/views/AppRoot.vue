<script setup lang="ts">
import { authenticationUser } from "@/services";
import { useQuery } from "@tanstack/vue-query";
import { RouterView } from "vue-router";
const { data } = useQuery({
  queryKey: ["userAuth"],
  queryFn: authenticationUser,
});
</script>
<template>
  <RouterView />
</template>
