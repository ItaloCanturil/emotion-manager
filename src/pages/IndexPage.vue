<template>
  <q-page class="home tw-flex tw-justify-evenly tw-flex-col">
    <section class="home__titles">
      <div class="tw-flex tw-justify-center">
        <p>{{ currentDate }}</p>
      </div>
      <h1 class="home__title tw-leading-normal tw-self-end tw-mt-auto">Hi, User</h1>
    </section>
    <!-- <h1>How are you feeling today?</h1> -->

    <div class="home__emotion tw-flex tw-w-full tw-overflow-scroll tw-scrollbar-hide  tw-self-start ">
      <EmotionBox v-model="emotion.emotion"
      class="tw-mx-3 tw-text-gray-400" :class="{'tw-bg-primary' : active == index}"  v-for="(emotion, index) in emotions" :key="emotion.emotion" :icon="emotion.icon" :emotion="emotion.emotion" @click="() => active == index ? active = -1 : active = index"/>
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
    <q-btn class="home__btn tw-bg-primary tw-h-10" :disable="!isValid" @click="handleFinish">
      Finish the day
    </q-btn>
  </q-page>

</template>

<script setup lang="ts">
import { IEmotion } from 'components/models';
import EmotionBox from 'components/EmotionBox.vue';
import { computed, ref } from 'vue';
import { useDateFormat, useNow } from '@vueuse/core';
import { useDiaryEmotion } from 'src/stores/diaryEmotion';

const diaryEmotionStore = useDiaryEmotion();

const currentDate = useDateFormat(useNow(), 'DD/MM/YYYY HH:mm')

const active = ref<number>();

const isValid = () => {
  return diaryEmotionStore.emotionDaily.description ? false : true;
}

const handleFinish = () => {
  diaryEmotionStore.emotionDaily.emotion = emotions.value[active.value as number].emotion;
  diaryEmotionStore.addDailyEmotion();
}

const emotions = ref<IEmotion[]>([
  {
    icon: 'fa-solid fa-face-laugh-beam',
    emotion: 'Happy'
  },
  {
    icon: 'fa-solid fa-face-frown',
    emotion: 'Sad'
  },
  {
    icon: 'fa-solid fa-face-laugh-beam',
    emotion: 'Neutral'
  },
  {
    icon: 'fa-solid fa-face-laugh-beam',
    emotion: 'Relaxed'
  },
  {
    icon: 'fa-solid fa-face-laugh-beam',
    emotion: 'Angry'
  },
  {
    icon: 'fa-solid fa-face-laugh-beam',
    emotion: 'Happy'
  },
]);
</script>

<style lang="scss" scoped>
.home {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(100px, 150px);
  grid-template-areas:
      "titles"
      "feelings"
      "texts"
      "btn"
      ;

  &__titles  {
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
