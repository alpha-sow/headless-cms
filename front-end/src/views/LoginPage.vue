<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/LoginForm.vue";
import type User from "@/models/User";
import { useI18n } from "vue-i18n";
import { authenticationCredentialWithBasicAuth } from "@/services";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

const { t } = useI18n();

const router = useRouter();

const { isPending, mutate } = useMutation({
  mutationFn: (user: User) =>
    authenticationCredentialWithBasicAuth(user.username, user.password),
  onSuccess: (_) => {
    router.push({ name: "root" });
  },
  onError: (_) => {
    toast.error("Authentication failed", {
      description: "Please check your username and password.",
    });
  },
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
