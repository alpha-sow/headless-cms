<script setup lang="ts">
import { authenticationUser } from "@/services/AuthService";
import { useForm } from "vee-validate";
import { ListTile } from "@/components/ui/list-tile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
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
import { Input, InputFile } from "@/components/ui/input";
import { updateAvatar, updatePhone } from "@/services/UserService";
import { useAuthStore } from "@/stores/UseAuthStore";
import { toast } from "vue-sonner";
import { userRole } from "@/models/UserRole";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const authStore = useAuthStore();

const queryClient = useQueryClient();

const { data } = useQuery({
  queryKey: ["profile"],
  queryFn: authenticationUser,
});

const { handleSubmit } = useForm({
  initialValues: {
    phoneField: "",
    avatarField: null as File | null,
  },
});

const onSubmit = handleSubmit((value) => {
  updatePhoneMutation.mutate(value.phoneField);
});

const updatePhoneMutation = useMutation({
  mutationFn: (phone: string) =>
    updatePhone(authStore.user?.username ?? "", { phone: phone }),
  onSuccess: () => {
    toast.success("Phone number updated successfully!");
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  },
  onError: (error) => {
    toast.error(
      `Failed to update phone number: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  },
});

const onSubmitAvatar = handleSubmit((value) => {
  updateAvatarMutation.mutate(value.avatarField!);
});

const updateAvatarMutation = useMutation({
  mutationFn: (avatar: File) =>
    updateAvatar(authStore.user?.username ?? "", { avatar: avatar }),
  onSuccess: () => {
    toast.success(t("avatar_updated_successfully"));
    queryClient.invalidateQueries({ queryKey: ["profile"] });
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
  <div v-if="data" class="pr-4">
    <ListTile :title="t('profile_information')" />
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
    <ListTile :title="t('username')" :description="data.username" />
    <ListTile
      :title="t('authorities')"
      description="User roles and permissions"
    >
      <template #trailing>
        <Badge
          class="text-xs font-semibold"
          v-for="role in data.authorities"
          :key="role.username"
        >
          {{ userRole(role.authority) }}
        </Badge>
      </template>
    </ListTile>
    <hr />
    <ListTile
      :title="t('phone_number')"
      :description="data.phone ?? t('no_phone_number')"
    >
      <template #trailing>
        <EditDialog :description="t('please_enter_your_new_phone_number')">
          <form id="dialogForm" class="space-y-6" @submit="onSubmit">
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
  </div>
  <div v-else class="p-4">
    <p>{{ t("loading") }}</p>
  </div>
</template>
