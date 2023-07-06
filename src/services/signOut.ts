import { supabase } from 'src/boot/supabase';

export async function signOut() {
  const signOut = await supabase.auth.signOut();
}
