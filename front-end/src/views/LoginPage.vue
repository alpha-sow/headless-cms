<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/UseAuthStore";
import LoginForm from "@/components/LoginForm.vue";
import type User from "@/models/User";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
        <CardTitle> {{ t("login") }} </CardTitle>
        <CardDescription>{{
          t("login_with_username_and_password")
        }}</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm @onSubmit="onSubmit" :is-loading="isPending" />
      </CardContent>
    </Card>
  </div>
</template>
