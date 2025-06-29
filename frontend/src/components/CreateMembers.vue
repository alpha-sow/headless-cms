<script setup lang="ts">
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "vue-i18n";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const { t } = useI18n();

const emits = defineEmits<{
  (e: "submit", values: any): void;
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
  emits("submit", values);
});
</script>
<template>
  <Dialog>
    <DialogTrigger>
      <Button>{{ t("create_members") }}</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t("create_members") }}</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <form id="dialogForm" class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>{{ t("username") }}</FormLabel>
            <FormControl>
              <Input
                :placeholder="t('enter_username')"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="my-4"></div>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>{{ t("password") }}</FormLabel>
            <FormControl>
              <Input
                type="password"
                :placeholder="t('enter_password')"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <DialogFooter>
        <DialogClose>
          <Button type="submit" form="dialogForm"> {{ t("create") }} </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
