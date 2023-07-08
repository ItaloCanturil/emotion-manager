import { signInWithEmail } from 'src/services/auth';
import { setDataExpire, getDataExpire, getData } from './../util/storeLocal';
// import { loginAuth } from '../services/auth';
import { defineStore } from 'pinia';
import { supabase } from 'src/boot/supabase';

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
    logout() {
      localStorage.clear();
      this.logged = false;

      supabase.auth.signOut();
    },
  },
});
