<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { supabase } from './boot/supabase';
import { setDataExpire } from './util/storeLocal';
import { useUserStore } from 'src/stores/user-store';

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    console.log('🚀 ~ supabase.auth.getSession ~ data:', data)
    setDataExpire('session', data, 160 * 8)
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    setDataExpire('session', _session, 160 * 8)
  })
})
</script>

<style lang="scss">
.auth-page {
  background: linear-gradient(
      180deg,
      rgba(171, 65, 255, 0.2) 0%,
      rgba(171, 65, 255, 0) 100%
    ),
    #f6fff8;
}

.q-page {
  @apply tw-bg-emo-bg-gray
}
</style>
