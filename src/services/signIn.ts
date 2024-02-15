import { supabase } from 'src/boot/supabase';
import { getURL } from 'src/util/util';

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getURL(),
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
