<template>
  <q-page
  class="auth-page tw-p-4 tw-flex tw-flex-col tw-items-center tw-justify-center"
  >
    <div class="tw-flex-1"></div>
    <div class="tw-flex">
      <div class="img-wrapper tw-max-w-[190px]">
        <img
          class="responsive-img"
          src="/mindfullness.svg"
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

    <div class="tw-flex tw-flex-col tw-mt-6" v-if="!isEmail">
      <q-btn no-caps rounded class="tw-bg-primary tw-text-white tw-mb-4" @click="isEmail = !isEmail"
        >Entrar com e-mail</q-btn
      >

      <q-btn flat rounded no-caps @click="userStore.loginWithProvider('google')">
        <q-icon name="img:/icons/icon__google.svg" class="tw-mr-3" size="xs"></q-icon>

        Entrar com o Google
      </q-btn>
    </div>

    <form class="tw-flex tw-flex-col tw-mt-6 tw-w-full tw-max-w-xs" v-if="isEmail">
      <q-input v-model="form.email" label="Email" :rules="[val => validateEmail(val) || 'Insira um email válido']"></q-input>

      <q-input v-model="form.password" label="Senha" type="password" :rules="[val => val.length >= 8 || 'Insira uma senha válida']"></q-input>

      <q-btn no-caps rounded class="tw-bg-primary tw-text-white tw-mb-4" type="submit" :disable="!isValid" @click.prevent="handleLogin()">Login</q-btn>

    </form>

    <div class="tw-flex tw-flex-col tw-items-center">
      <div class=" tw-text-xs tw-cursor-pointer" @click="isEmail = !isEmail" v-if="isEmail">Alterar forma de login</div>
      <div>
        Esqueceu a senha?
      </div>
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
import { validateEmail } from 'src/util/util';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';

const userStore = useUserStore();
const $q = useQuasar();
const router = useRouter();

const isEmail = ref(false);

const form = ref({
  email: '',
  password: ''
})

const isValid = computed(() => {
  return form.value.email && form.value.password && validateEmail(form.value.email) && form.value.password.length >= 8;
})

const handleLogin = async () => {
  try {
    const response = await userStore.login(form.value);


    if (response) {
      $q.notify({
        color: 'positive',
        message: 'Usuário registrado com sucesso',
        position: 'bottom'
      });

      router.push('/');
    }
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: 'Erro nas credenciais do login',
      position: 'bottom',
    });
  }
}
</script>
