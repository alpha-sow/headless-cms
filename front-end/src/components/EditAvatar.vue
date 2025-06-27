<script lang="ts" setup>
import type { UserInfo } from "@/models";
import { useForm } from "vee-validate";
import { ListTile } from "@/components/ui/list-tile";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import EditDialog from "@/components/EditDialog.vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-vue-next";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputFile } from "@/components/ui/input";
import { updateAvatar } from "@/services/UsersService";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

const { t } = useI18n();
const props = defineProps<{
  data: UserInfo;
}>();

const { handleSubmit } = useForm({
  initialValues: {
    phoneField: "",
    avatarField: null as File | null,
  },
});

const queryClient = useQueryClient();

const onSubmitAvatar = handleSubmit((value) => {
  updateAvatarMutation.mutate(value.avatarField!);
});

const updateAvatarMutation = useMutation({
  mutationFn: (avatar: File) =>
    updateAvatar(props.data.username, { avatar: avatar }),
  onSuccess: () => {
    toast.success(t("avatar_updated_successfully"));
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
  },
  onError: (error) => {
    toast.error(
      t("failed_to_update_avatar", {
        message: error instanceof Error ? error.message : "Unknown error",
      })
    );
  },
});
</script>
<template>
  <ListTile title="">
    <template #leading>
      <div class="flex flex-col items-center justify-center">
        <Avatar class="h-22 w-22 mb-2">
          <AvatarImage
            :src="data.avatar ?? ''"
            alt="User Avatar"
            class="object-cover"
          />
          <AvatarFallback class="rounded-lg h-22 w-22">
            <CircleUser :size="62" />
          </AvatarFallback>
        </Avatar>
        <EditDialog :description="t('please_upload_your_avatar')">
          <form id="dialogForm" class="space-y-6" @submit="onSubmitAvatar">
            <FormField v-slot="{ componentField }" name="avatarField">
              <FormItem>
                <FormLabel>{{ t("avatar") }}</FormLabel>
                <FormControl>
                  <InputFile
                    id="avatarField"
                    v-bind="componentField"
                    accept="image/png, image/jpeg, image/webp"
                  />
                  <p
                    class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    PNG, {{ t("or") }} JPG.
                  </p>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </form>
        </EditDialog>
      </div>
    </template>
  </ListTile>
</template>
