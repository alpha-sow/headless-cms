<script setup lang="ts">
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { userRole, type UserRoleType } from "@/models";
import { fetchAuthorities } from "@/services";
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  role: UserRoleType;
}>();

const { data } = useQuery({
  queryKey: ["authorities"],
  queryFn: fetchAuthorities,
});

const selectedRole = ref<UserRoleType>(props.role);

defineEmits<{
  (e: "updateValue", value: UserRoleType): void;
}>();
</script>
<template>
  <Select
    v-model="selectedRole"
    @update:model-value="(_) => $emit('updateValue', selectedRole)"
  >
    <SelectTrigger>
      <SelectValue :placeholder="t(userRole(role))" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{ t("authorities") }}</SelectLabel>
        <SelectItem v-for="item in data" :value="item" :key="item">
          {{ t(userRole(item)) }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
