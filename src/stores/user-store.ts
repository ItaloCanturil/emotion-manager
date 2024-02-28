import { getUser, signInWithEmail, signUp } from 'src/services/auth';
import {
  setDataExpire,
  getDataExpire,
  removeDataExpire,
} from './../util/storeLocal';
import { defineStore } from 'pinia';
import { supabase } from 'src/boot/supabase';
import { signInWithGoogle } from 'src/services/signIn';
import { SignUpData } from 'src/types/authType';

export const useUserStore = defineStore('user', {
  state: () => ({
    logged: Boolean(getDataExpire('logged')),
    user: getDataExpire('auth'),
    session: getDataExpire('session'),
  }),
  actions: {
    login(email: string, password: string) {
      const response = signInWithEmail(email, password);

      response.then((res) => {
        this.user = res?.user;
        setDataExpire('logged', 1, 160 * 4);
        setDataExpire('auth', res?.user, 160 * 4);
        setDataExpire('session', res?.session, 160 * 4);

        this.logged = true;
      });

      return response;
    },
    loginWithGoogle() {
      const response = signInWithGoogle().then(() => {
        console.log('volteou');
      });
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
