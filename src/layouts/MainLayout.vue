<template>
  <q-layout view="hHh lpR lFf" class="tw-bg-emo-bg-gray">
    <q-header  class="home__titles">
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
        <q-btn rounded flat>
          <q-icon name="eva-home-outline" size="14px"></q-icon>
        </q-btn>
        <p>{{ currentDate }}</p>
        <q-btn rounded flat @click="handleLogout()">
          <q-icon name="eva-log-out-outline" size="14px"></q-icon>
        </q-btn>
      </div>
      <h1 class="home__title tw-leading-normal tw-self-end tw-mt-auto tw-pl-4">
        {{ $t('hi', { user: username })}}
      </h1>
    </q-header>
    <q-page-container class="tw-max-w-2xl tw-mr-auto tw-ml-auto">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core';
import { computed } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();
const userStore = useUserStore();
const currentDate = useDateFormat(useNow(), 'DD/MM/YYYY HH:mm');

const username = computed(() => {
  if (typeof userStore.user === 'object' && userStore.user !== null) {
    const user = userStore.user as { raw_user_meta_data?: { name?: string } };
    return user.raw_user_meta_data && user.raw_user_meta_data.name ? user.raw_user_meta_data.name : 'User'
  }

  return 'User'
});

const handleLogout = async () => {
  try {
    await userStore.logout()

    router.push({ name: 'Login'})
  } catch (error) {
    $q.notify({
      message: error as string,
      position: 'bottom'
    })
  }
}
</script>
