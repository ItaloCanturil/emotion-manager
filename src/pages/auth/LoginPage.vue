<template>
  <q-page
  class="auth-page tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <div class="tw-flex-1"></div>
    <div class="tw-flex">
      <div class="img-wrapper tw-max-w-[190px]">
        <img
          class="responsive-img"
          src="/emotion-manager/mindfullness.svg"
          alt="Mindfullness"
        />
      </div>
      <q-icon name="mdi-translate"></q-icon>
    </div>
    <div class="tw-mt-6 tw-text-center">
      <h1 class="tw-text-4xl">
        Organize suas ideias e sentimentos diariamente.
      </h1>

      <div class="tw-mt-4">
        Junte-se e melhore seu estado de mente e espirito.
      </div>
    </div>

    <div class="tw-flex tw-flex-col tw-mt-6">
      <q-btn no-caps rounded class="tw-bg-primary tw-text-white tw-mb-4"
        >Atualize seu diário</q-btn
      >

      <q-btn flat rounded no-caps @click="userStore.loginWithGoogle()">
        <q-icon name="img:/emotion-manager/icons/icon__google.svg" class="tw-mr-3" size="xs"></q-icon>

        Entrar com o Google
      </q-btn>
    </div>

    <div class="tw-flex-1"></div>

    <div class="tw-flex tw-items-center tw-gap-2 tw-text-xs">
      <div>
        Ainda não tem conta?
      </div>
      <RouterLink class="tw-text-primary tw-cursor-pointer" to="/signup" >Registre-se</RouterLink>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
// import { signInWithGoogle } from 'src/services/signIn';

const userStore = useUserStore();
const route = useRouter()
</script>
