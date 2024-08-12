<template>
  <q-page class="home row items-center justify-center" :style-fn="tweak">
    <div
      class="tw-flex tw-flex-col tw-rounded tw-p-4 tw-h-screen tw-w-full tw-gap-8"
    >



      <div
        class="home__emotion tw-flex tw-w-full tw-overflow-scroll tw-scrollbar-hide tw-self-start"
      >
        <EmotionBox
          v-model="emotion.emotion"
          class="tw-mx-3 tw-text-gray-400"
          :class="{ 'tw-bg-primary': active == index }"
          v-for="(emotion, index) in emotions"
          :key="emotion.emotion"
          :icon="emotion.icon"
          :emotion="emotion.emotion"
          @click="() => handleActive(index, emotion)"
        />
      </div>

      <div class="home__wrapper">
        <q-input
        color="#E2E2E2"
        v-model="diaryEmotionStore.emotionDaily.description"
        label="Describe your day:"
        type="textarea"
        filled
        />
      </div>

      <!-- <div class="tw-flex-1"></div> -->
      <q-btn
        class="home__btn tw-bg-primary tw-h-10 tw-rounded-xl"
        :disable="!isValid"
        @click="handleFinish"
      >
        {{ $t('finish_button') }}
      </q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { IEmotion } from 'components/models';
import EmotionBox from 'components/EmotionBox.vue';
import { computed, ref } from 'vue';
import { useDiaryEmotion } from 'src/stores/diaryEmotion';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const diaryEmotionStore = useDiaryEmotion();

const active = ref<number>();

const isValid = computed(() => Boolean(diaryEmotionStore.emotionDaily.description) &&
Boolean(diaryEmotionStore.emotionDaily.emotion));


const handleFinish = async () => {
  try {
    const res = await diaryEmotionStore.addDailyEmotion({
    emotion: emotions.value[active.value as number].emotion,
    description: diaryEmotionStore.emotionDaily.description,
  });


    $q.notify({
      message: 'Concluído',
      position: 'bottom'
    })
  } catch (error) {
    $q.notify({
      message: error as string,
      position: 'bottom'
    })
  } finally {
    active.value = -1;
    diaryEmotionStore.clearData();
  }
};

const handleActive = (index: number, emotion: IEmotion) => {
  if (diaryEmotionStore.emotionDaily.emotion == emotion.emotion) {
    diaryEmotionStore.emotionDaily.emotion = '';

    return active.value == index ? (active.value = -1) : (active.value = index);
  }
  diaryEmotionStore.emotionDaily.emotion = emotion.emotion;
  return active.value == index ? (active.value = -1) : (active.value = index);
};

const emotions = ref<IEmotion[]>([
  {
    icon: 'img:/icons/happy.svg',
    emotion: 'Happy',
  },
  {
    icon: 'img:/icons/sad.svg',
    emotion: 'Sad',
  },
  {
    icon: 'img:/icons/neutral.svg',
    emotion: 'Neutral',
  },
  {
    icon: 'img:/icons/relaxed.svg',
    emotion: 'Relaxed',
  },
  {
    icon: 'img:/icons/angry.svg',
    emotion: 'Angry',
  },
  {
    icon: 'img:/icons/confused.svg',
    emotion: 'Confused',
  },
]);

const tweak = (offset: string) => {
  return { minHeight: offset ? `calc(-100vh + ${offset}px)` : '100vh' }
}
</script>

<style lang="scss" scoped>
.home {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(100px, 150px);
  grid-template-areas:
    'titles'
    'feelings'
    'texts'
    'btn';

  &__titles {
    grid-area: titles;
  }

  &__emotion {
    grid-area: feelings;
  }

  &__texts {
    grid-area: texts;
  }

  &__btn {
    grid-area: btn;
  }
}
</style>
