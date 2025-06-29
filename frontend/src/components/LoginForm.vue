<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Loader2 } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  isLoading?: boolean;
}>();

const emits = defineEmits<{
  (e: "onSubmit", values: { username: string; password: string }): void;
}>();

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(4, { message: t("invalid_username_or_password") }),
    password: z
      .string()
      .min(6, { message: t("must_be_6_or_more_characters_long") })
      .max(50),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  emits("onSubmit", values);
});
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>{{ t("username_or_email") }}</FormLabel>
        <FormControl>
          <Input
            :placeholder="t('username_or_email')"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>{{ t("password") }}</FormLabel>
        <FormControl>
          <Input
            :type="t('password')"
            :placeholder="t('password')"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button class="w-full" type="submit" :disabled="props.isLoading">
      <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
      {{ t("login") }}
    </Button>
  </form>
</template>
