import { getUser, signInWithEmail, signUp } from 'src/services/auth';
import {
  setDataExpire,
  getDataExpire,
  removeDataExpire,
} from './../util/storeLocal';
import { defineStore } from 'pinia';
import { supabase } from 'src/boot/supabase';
import { signInWithProvider } from 'src/services/auth';
import { SignUpData } from 'src/types/authType';
import { Provider } from '@supabase/supabase-js';

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    logged: Boolean(getDataExpire('logged')),
    user: getDataExpire('user'),
    session: getDataExpire('session'),
  }),
  actions: {
    async login(params: SignUpData) {
      try {
        const response = await signInWithEmail(params);

        if (response.user) {
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
    async getProfile() {
      try {
        this.loading = true;
        const { user } = this.session;
        console.log('🚀 ~ getProfile ~ user:', user);

        const { data, error, status } = await supabase
          .from('profiles')
          .select('username, website, avatar_url')
          .eq('id', user.id)
          .single();

        console.log('🚀 ~ getProfile ~ status:', status);
        if (error && status !== 406) throw error;

        if (data) {
          this.user = data;
        }
      } catch (error: any) {
        alert(error.message);
      } finally {
        this.loading = false;
      }
    },
    async signUpUser(params: SignUpData) {
      try {
        const response = await signUp(params);

        if (response.user) {
          this.logged = true;
        }

        return response;
      } catch (error) {
        removeDataExpire('logged');
        throw error;
      }
    },
    async recoveryPass(email: string) {
      try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          email
        );

        if (error) throw error;

        return data;
      } catch (error) {
        throw error;
      }
    },
  },
});
