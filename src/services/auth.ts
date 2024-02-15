import { supabase } from 'src/boot/supabase';

type SignUpData = {
  email: string;
  password: string;
};

export const signUp = async (params: SignUpData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });
    console.log('🚀 ~ signUp ~ data:', data);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
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

export const getUser = async () => {
  await supabase.auth.getUser().then(({ data }) => {
    if (data.user) {
      return data.user;
    }
  });
};
