<script setup lang="ts">
import { h } from "vue";
import { ListTile } from "@/components/ui/list-tile";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { UserInfo } from "@/models/UserInfo";
import { useQuery } from "@tanstack/vue-query";
import { fetchAllUsers } from "@/services/UserService";

const { data } = useQuery({
  queryKey: ["users"],
  queryFn: fetchAllUsers,
});

const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "username",
    header: () => h("div", "Username"),
  },
  {
    accessorKey: "active",
    header: () => h("div", "Active"),
    cell: ({ row }: { row: any }) =>
      h("div", row.getValue("active") ? "Yes" : "No"),
  },
  {
    accessorKey: "roles",
    header: () => h("div", "Roles"),
    cell: ({ row }: { row: any }) => h("div", row.getValue("roles")),
  },
];
</script>
<template>
  <div class="pr-4">
    <ListTile title="Users(1)">
      <template #trailing>
        <Button> Create members</Button>
      </template>
    </ListTile>
    <DataTable v-if="data" :data="data.data" :columns="columns" />
  </div>
</template>
