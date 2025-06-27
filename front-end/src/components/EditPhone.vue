<script lang="ts" setup>
import { useForm } from "vee-validate";
import { ListTile } from "@/components/ui/list-tile";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import EditDialog from "@/components/EditDialog.vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updatePhone } from "@/services/UsersService";
import { toast } from "vue-sonner";
import { useI18n } from "vue-i18n";
import type { UserInfo } from "@/models";
const { t } = useI18n();

const queryClient = useQueryClient();

const props = defineProps<{
  data: UserInfo;
}>();

const { handleSubmit } = useForm({
  initialValues: {
    phoneField: "",
    avatarField: null as File | null,
  },
});

const onSubmitPhone = handleSubmit((value) => {
  updatePhoneMutation.mutate(value.phoneField);
});

const updatePhoneMutation = useMutation({
  mutationFn: (phone: string) =>
    updatePhone(props.data?.username ?? "", { phone: phone }),
  onSuccess: () => {
    toast.success("phone_number_updated_successfully");
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
  },
  onError: (error) => {
    toast.error(
      `Failed to update phone number: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  },
});
</script>
<template>
  <ListTile
    :title="t('phone_number')"
    :description="data!.phone ?? t('no_phone_number')"
  >
    <template #trailing>
      <EditDialog :description="t('please_enter_your_new_phone_number')">
        <form id="dialogForm" class="space-y-6" @submit="onSubmitPhone">
          <FormField v-slot="{ componentField }" name="phoneField">
            <FormItem>
              <FormLabel>{{ t("phone_number") }}</FormLabel>
              <FormControl>
                <Input
                  :placeholder="t('phone_number')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </EditDialog>
    </template>
  </ListTile>
</template>
