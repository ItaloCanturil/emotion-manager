import { supabase } from 'src/boot/supabase';

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://hprstsdakblscvlbkcxf.supabase.co/auth/v1/callback',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
