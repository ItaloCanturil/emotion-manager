<template>
  <q-page>
    <div>user page</div>

    <pre>{{ userStore.user }}</pre>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();
</script>
