<script setup lang="ts">
import { h } from "vue";
import { ListTile } from "@/components/ui/list-tile";
import DataTable from "@/components/DataTable.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { UserInfo } from "@/models/UserInfo";
import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";
import { fetchAllUsers, createUser } from "@/services/UsersService";
import CreateMembers from "@/components/CreateMembers.vue";
import { toast } from "vue-sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CircleUser,
  LucideBadgeCheck,
  LucideBadgeMinus,
} from "lucide-vue-next";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import DropdownAction from "@/components/DropdownAction.vue";
import { useRouter } from "vue-router";
import type { UserAuthority } from "@/models/UserAuthority";
import { Badge } from "@/components/ui/badge";
import { userRole } from "./utils";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const router = useRouter();

const queryClient = useQueryClient();

const { isPending, data } = useQuery({
  queryKey: ["users"],
  queryFn: fetchAllUsers,
});

const columns: ColumnDef<UserInfo>[] = [
  {
    header: () => h("div", t("avatar")),
    accessorKey: "avatar",
    cell: ({ row }) =>
      h(
        Avatar,
        {
          class: "h-8 w-8 rounded-lg",
        },
        {
          default: () => [
            h(AvatarImage, {
              src: (row.getValue("avatar") as string) ?? "",
              alt: "username",
              class: "object-cover",
            }),
            h(
              AvatarFallback,
              {
                class: "rounded-lg",
              },
              () => h(CircleUser)
            ),
          ],
        }
      ),
  },
  {
    header: () => h("div", t("username")),
    accessorKey: "username",
  },
  {
    header: () => h("div", t("phone")),
    accessorKey: "phone",
  },
  {
    header: () => h("div", t("authorities")),
    accessorKey: "authorities",
    cell: ({ row }) =>
      h(
        "div",
        {},
        (row.getValue("authorities") as UserAuthority[]).map((authority) =>
          h(Badge, {}, () => t(userRole(authority.authority)))
        )
      ),
  },
  {
    header: () => h("div", t("enabled")),
    accessorKey: "enabled",
    cell: ({ row }) =>
      row.getValue("enabled")
        ? h(LucideBadgeCheck, {
            class: "text-green-500",
          })
        : h(LucideBadgeMinus, {
            class: "text-red-500",
          }),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) =>
      h(DropdownAction, {}, () => [
        h(
          DropdownMenuItem,
          {
            onClick: () => {
              router.push({
                name: "settingsUsersDetail",
                params: { username: row.getValue("username") },
              });
            },
          },
          () => t("edit")
        ),
      ]),
  },
];

const createUserMutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    toast.success("User created successfully");
  },
  onError: (error: any) => {
    toast.error(`${error.response?.data?.message || "Failed to create user"}`);
  },
});

function handleCreateMemberSubmit(values: any) {
  const { username, password } = values;
  createUserMutation.mutate({
    username: username,
    password: password,
  });
}
</script>
<template>
  <div>
    <ListTile title="Users">
      <template #trailing>
        <CreateMembers @submit="handleCreateMemberSubmit" />
      </template>
    </ListTile>
    <span v-if="isPending">{{ t("loading") }}</span>
    <span v-else>
      <DataTable :data="data!" :columns="columns" />
    </span>
  </div>
</template>
