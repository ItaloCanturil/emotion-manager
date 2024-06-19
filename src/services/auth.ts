import { Provider } from '@supabase/supabase-js';
import { supabase } from 'src/boot/supabase';
import { SignUpData } from 'src/types/authType';
import { getURL } from 'src/util/util';

export const signUp = async (params: SignUpData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signInWithEmail = async (params: SignUpData) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function signInWithProvider(provider: Provider) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
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

export const getUser = async () => {
  await supabase.auth.getUser().then(({ data }) => {
    if (data.user) {
      return data.user;
    }
  });
};
