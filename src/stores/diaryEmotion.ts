import { defineStore } from 'pinia';
import { supabase } from 'src/boot/supabase';

interface IDailyEmotion {
  description: string;
  emotion: string;
  user_id: string | null;
}

export const useDiaryEmotion = defineStore('diary', {
  state: () => ({
    emotionDaily: {} as IDailyEmotion,
  }),
  actions: {
    async addDailyEmotion(param: IDailyEmotion) {
      try {
        const { data, error } = await supabase.from('emotions').insert([
          {
            emotion: param.emotion,
            description: param.description,
            user_id: param.user_id,
          },
        ]);

        if (error) throw error;

        return data;
      } catch (error) {
        throw error;
      }
    },

    async recoveryHistory(user_id: string) {
      try {
        const { data, error } = await supabase
          .from('emotions')
          .select('user_id');

        if (error) throw error;

        return data;
      } catch (error) {
        throw error;
      }
    },

    clearData() {
      this.emotionDaily = {
        emotion: '',
        description: '',
        user_id: null,
      };
    },
  },
});
