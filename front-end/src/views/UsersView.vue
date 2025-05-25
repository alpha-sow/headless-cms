<script setup lang="ts">
import { h } from "vue";
import { ListTile } from "@/components/ui/list-tile";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ColumnDef } from "@tanstack/vue-table";
import { useVueTable, getCoreRowModel, FlexRender } from "@tanstack/vue-table";
import type { UserInfo } from "@/models/UserInfo";

const data: UserInfo[] = [
  {
    username: "admin",
    active: true,
    roles: "admin",
  },
];

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

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>
<template>
  <div class="pr-4">
    <ListTile title="Users(1)">
      <template #trailing>
        <Button> Create members</Button>
      </template>
    </ListTile>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow>
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
