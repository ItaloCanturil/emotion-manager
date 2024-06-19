import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(
  supabaseUrl as string,
  supabaseKey as string
);

// supabase.auth.onAuthStateChange((event, session) => {
//   const userStore = useUserStore();

//   userStore.user = session?.user || null;
//   userStore.logged = session?.user ? true : false;
// });

export default function useSupabase() {
  return { supabase };
}
