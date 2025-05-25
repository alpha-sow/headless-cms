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

const props = defineProps<{
  isLoading?: boolean;
}>();

const emits = defineEmits(["onSubmit"]);

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(4, { message: "Invalid user address" }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" })
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
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="Username" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="Password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button class="w-full" type="submit" :disabled="props.isLoading">
      <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
      Login
    </Button>
  </form>
</template>
