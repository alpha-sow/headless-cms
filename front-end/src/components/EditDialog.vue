<script setup lang="ts">
import { defineProps } from "vue";
import {
  Dialog,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{
  description?: string;
}>();
</script>
<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> {{ t("edit") }} </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t("edit") }} </DialogTitle>
        <DialogDescription>{{ description ?? "" }}</DialogDescription>
      </DialogHeader>
      <slot></slot>
      <DialogFooter>
        <DialogClose>
          <Button type="submit" form="dialogForm"> Save changes </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
