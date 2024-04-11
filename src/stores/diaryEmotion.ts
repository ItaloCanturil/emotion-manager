import { defineStore } from 'pinia';
import { supabase } from 'src/boot/supabase';

interface IDailyEmotion {
  description: string;
  emotion: string;
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
          },
        ]);

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
      };
    },
  },
});
