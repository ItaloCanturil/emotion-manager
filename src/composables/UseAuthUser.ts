import { ref } from 'vue';
import useSupabase from 'boot/supabase';

const user = ref<any>();

interface Register {
  email: string;
  password: string;
  meta: object;
}

export default function useAuthUser() {
  const { supabase } = useSupabase();

  const loginWithProvider = async (provider: string) => {
    const { user, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLogged = () => {
    return !!user.value;
  };

  // const register = async ({ email, password, ...meta }: Register) => {
  //   const { user, error } = await supabase.auth.signUp(
  //     { email, password },
  //     {
  //       data: meta,
  //     }
  //   );
  //   if (error) throw error;
  //   return user;
  // };

  return {
    user,
    loginWithProvider,
    logout,
    isLogged,
    // register,
  };
}
