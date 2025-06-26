<script setup lang="ts">
import { ListTile } from "@/components/ui/list-tile";
import { useForm } from "vee-validate";
import EditDialog from "@/components/EditDialog.vue";
import { Input, InputFile } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/vue-query";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/vue-query";
import {
  deleteUser,
  fetchUser,
  updateAvatar,
  updateEnabled,
  updatePhone,
} from "@/services/UsersService";
import { toast } from "vue-sonner";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import AlertDialogAction from "@/components/AlertDialogAction.vue";
import { CircleArrowLeft, CircleUser } from "lucide-vue-next";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useI18n } from "vue-i18n";
import AuthoritySelect from "@/components/AuthoritySelect.vue";
import type { UserRoleType } from "@/models";
import { updateRole } from "@/services";
const { t } = useI18n();

const props = defineProps<{
  username: string;
}>();

const queryClient = useQueryClient();

const { data } = useQuery({
  queryKey: ["user", props.username],
  queryFn: () => fetchUser(props.username),
});

const router = useRouter();

function handleDeleteUser() {
  deleteMutation.mutate(props.username);
}

const deleteMutation = useMutation({
  mutationFn: deleteUser,
  onSuccess: () => {
    toast.success(t("user_deleted_successfully"));
    router.back();
  },
  onError: (error: any) => {
    toast.error(
      `${error.response?.data?.message || t("failed_to_delete_user")}`
    );
  },
});

function handleSwitchToggle(value: boolean) {
  enabledMutation.mutate(value);
}

const enabledMutation = useMutation({
  mutationFn: (enabled: boolean) =>
    updateEnabled(props.username, { enabled: enabled }),
  onSuccess: (data) => {
    toast.success(`User ${data.username} ${t("update_successful")}`);
    queryClient.invalidateQueries({ queryKey: ["user", props.username] });
  },
  onError: (error: any) => {
    toast.error(
      `${error.response?.data?.message || t("failed_to_update_user")}`
    );
  },
});

const { handleSubmit } = useForm({
  initialValues: {
    editField: "",
    avatarField: null as File | null,
  },
});

const onSubmit = handleSubmit((value) => {
  updatePhoneMutation.mutate(value.editField);
});

const updatePhoneMutation = useMutation({
  mutationFn: (phone: string) => updatePhone(props.username, { phone: phone }),
  onSuccess: () => {
    toast.success(t("phone_number_updated_successfully"));
    queryClient.invalidateQueries({ queryKey: ["user", props.username] });
  },
  onError: (error: any) => {
    toast.error(
      `${error.response?.data?.message || t("failed_to_update_phone_number")}`
    );
  },
});

const onSubmitAvatar = handleSubmit((value) => {
  updateAvatarMutation.mutate(value.avatarField!);
});

const updateAvatarMutation = useMutation({
  mutationFn: (avatar: File) =>
    updateAvatar(props.username, { avatar: avatar }),
  onSuccess: () => {
    toast.success("avatar_updated_successfully");
    queryClient.invalidateQueries({ queryKey: ["user", props.username] });
  },
  onError: (error) => {
    toast.error(
      `Failed to update avatar: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  },
});

function handleAuthorityChange(value: UserRoleType): void {
  updateAuthorityMutation.mutate(value);
}

const updateAuthorityMutation = useMutation({
  mutationFn: (role: UserRoleType) => updateRole(props.username, role),
  onSuccess: () => {
    toast.success(t("user_role_updated_successfully"));
    queryClient.invalidateQueries({ queryKey: ["user", props.username] });
  },
  onError: (error: any) => {
    toast.error(
      `${error.response?.data?.message || t("failed_to_update_user_role")}`
    );
  },
});
</script>
<template>
  <div v-if="data">
    <ListTile title="">
      <template #leading>
        <Button
          variant="ghost"
          @click="$router.push({ name: 'settingsUsersList' })"
        >
          <CircleArrowLeft class="w-5 h-5" />
          {{ t("back") }}
        </Button>
      </template>
    </ListTile>
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
                      accept="image/png, image/jpeg"
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
    <ListTile :title="t('username')" :description="data.username"> </ListTile>
    <ListTile
      :title="t('phone_number')"
      :description="data.phone ?? t('no_phone_number')"
    >
      <template #trailing>
        <EditDialog description="Enter phone number.">
          <form id="dialogForm" class="space-y-6" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="editField">
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
    <ListTile
      :title="t('authorities')"
      :description="t('user_role_and_permissions')"
    >
      <template #trailing>
        <AuthoritySelect
          :role="data.authorities[0].authority"
          @update-value="handleAuthorityChange"
        />
      </template>
    </ListTile>
    <hr />
    <ListTile :title="t('enabled')">
      <template #trailing>
        <Switch
          :model-value="data.enabled"
          @update:model-value="handleSwitchToggle"
        />
      </template>
    </ListTile>
    <hr />
    <ListTile :title="t('danger_zone')">
      <template #trailing>
        <AlertDialogAction @continue="handleDeleteUser">
          <Button variant="destructive"> {{ t("delete_account") }} </Button>
        </AlertDialogAction>
      </template>
    </ListTile>
  </div>
  <div v-else class="p-4">
    <p>{{ t("loading") }}</p>
  </div>
</template>
