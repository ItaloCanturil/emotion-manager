import { supabase } from 'src/boot/supabase';

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
