<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ListTile } from "@/components/ui/list-tile";
</script>

<template>
  <div class="pr-4">
    <ListTile
      title="Profile Info"
      description="Your email and profile picture are provided by your company.
"
    />
    <ListTile title="Username" description="admin">
      <template #trailing>
        <Button variant="outline"> Edit</Button>
      </template>
    </ListTile>
    <hr />
    <ListTile title="Email" description="No email">
      <template #trailing>
        <Button variant="outline"> Edit</Button>
      </template>
    </ListTile>
    <hr />
    <ListTile title="Phone number" description="No phone number">
      <template #trailing>
        <Button variant="outline"> Edit</Button>
      </template>
    </ListTile>
    <hr />
    <ListTile title="Danger zone">
      <template #trailing>
        <Button variant="destructive" disabled> Delete account </Button>
      </template>
    </ListTile>
  </div>
</template>
