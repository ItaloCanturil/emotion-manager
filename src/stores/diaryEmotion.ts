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
    async addDailyEmotion() {
      const { data, error } = await supabase.from('emotions').insert([
        {
          emotion: this.emotionDaily.emotion,
          description: this.emotionDaily.description,
        },
      ]);
    },
  },
});
