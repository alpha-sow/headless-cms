<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/useAuthStore";
import LoginForm from "@/components/LoginForm.vue";
import type User from "@/models/User";

const authStore = useAuthStore();

const { isPending, mutate } = useMutation({
  mutationFn: (user: User) =>
    authStore.signInWithUsernameAndPassword(user.username, user.password),
});

async function onSubmit(values: { username: string; password: string }) {
  mutate({
    username: values.username,
    password: values.password,
  });
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Card class="w-96">
      <CardHeader>
        <CardTitle> Login </CardTitle>
        <CardDescription> Login with username and password </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm @onSubmit="onSubmit" :is-loading="isPending" />
      </CardContent>
    </Card>
  </div>
</template>
