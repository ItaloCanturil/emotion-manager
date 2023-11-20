import { supabase } from 'src/boot/supabase';

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.href,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;

    console.log('🚀 ~ file: signIn.ts:18 ~ signInWithGoogle ~ data:', data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
