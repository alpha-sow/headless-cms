<script setup lang="ts">
import { authenticationUser } from "@/services/AuthService";
import { ListTile } from "@/components/ui/list-tile";
import { useQuery } from "@tanstack/vue-query";
import { userRole } from "@/models/UserRole";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "vue-i18n";
import EditAvatar from "@/components/EditAvatar.vue";
import EditPhone from "@/components/EditPhone.vue";

const { t } = useI18n();

const { isPending, data } = useQuery({
  queryKey: ["authUser"],
  queryFn: authenticationUser,
});
</script>

<template>
  <div>
    <div v-if="isPending" class="p-4">
      <p>{{ t("loading") }}</p>
    </div>
    <div v-else>
      <ListTile :title="t('profile_information')" />
      <EditAvatar :data="data!" />
      <ListTile :title="t('username')" :description="data!.username" />
      <ListTile
        :title="t('authorities')"
        description="User roles and permissions"
      >
        <template #trailing>
          <Badge
            class="text-xs font-semibold"
            v-for="role in data!.authorities"
            :key="role.username"
          >
            {{ userRole(role.authority) }}
          </Badge>
        </template>
      </ListTile>
      <hr />
      <EditPhone :data="data!" />
    </div>
  </div>
</template>
