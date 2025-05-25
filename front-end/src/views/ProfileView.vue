<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <div class="pr-4">
    <h1 class="text-2xl font-bold">Profile Info</h1>
    <div class="my-4">
      <h1 class="font-bold">Username</h1>
      <h1>admin</h1>
    </div>
    <hr />
    <div class="my-4">
      <h1 class="font-bold">Email</h1>
      <h1>No email</h1>
    </div>
    <hr />
    <div class="my-4">
      <h1 class="font-bold">Phone number</h1>
      <h1>No phone number</h1>
    </div>
    <hr />
    <div class="flex w-full justify-between py-4">
      <h1 class="font-bold">Danger zone</h1>
      <Button variant="destructive" disabled> Delete account </Button>
    </div>
  </div>
</template>
