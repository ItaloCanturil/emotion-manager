import { getUser, signInWithEmail, signUp } from 'src/services/auth';
import {
  setDataExpire,
  getDataExpire,
  removeDataExpire,
} from './../util/storeLocal';
import { defineStore } from 'pinia';
import { supabase } from 'src/boot/supabase';
import { signInWithProvider } from 'src/services/signIn';
import { SignUpData } from 'src/types/authType';
import { Provider } from '@supabase/supabase-js';

export const useUserStore = defineStore('user', {
  state: () => ({
    logged: Boolean(getDataExpire('logged')),
    user: getDataExpire('auth'),
    session: getDataExpire('session'),
  }),
  actions: {
    async login(params: SignUpData) {
      try {
        const response = await signInWithEmail(params);

        if (response.user) {
          this.getUser();

          this.logged = true;
        }

        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    loginWithProvider(provider: Provider) {
      const response = signInWithProvider(provider);
    },
    async logout() {
      localStorage.clear();
      this.logged = false;

      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    },
    getUser() {
      const response = getUser();

      response.then((data) => {
        console.log(data);
        setDataExpire('logged', 1, 160 * 4);
      });

      return response;
    },
    async signUpUser(params: SignUpData) {
      try {
        const response = await signUp(params);

        if (response.user) {
          this.getUser();

          this.logged = true;
        }

        return response;
      } catch (error) {
        removeDataExpire('logged');
        throw error;
      }
    },
  },
});
