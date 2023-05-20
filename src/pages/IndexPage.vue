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
      class="tw-mx-3 tw-text-gray-400" :class="{'tw-bg-primary' : active == index}"  v-for="(emotion, index) in emotions" :key="emotion.emotion" :icon="emotion.icon" :emotion="emotion.emotion" @click="() => handleActive(index, emotion)"/>
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
    <q-btn class="home__btn tw-bg-primary tw-h-10" :disable="isValid" @click="handleFinish">
      Finish the day
    </q-btn>

    <div class="tw-flex tw-justify-center">
      <div class="tw-w-4/5 tw-mx-auto tw-h-10 tw-bg-second tw-rounded tw-fixed tw-bottom-2">
        <div >
          <q-icon icon=""></q-icon>
        </div>
      </div>
    </div>
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

const isValid = computed(() => diaryEmotionStore.emotionDaily.description && diaryEmotionStore.emotionDaily.emotion ? false : true)

const handleFinish = () => {
  diaryEmotionStore.emotionDaily.emotion = emotions.value[active.value as number].emotion;
  diaryEmotionStore.addDailyEmotion();
}

const handleActive = (index: number, emotion: IEmotion) => {
  if (diaryEmotionStore.emotionDaily.emotion == emotion.emotion) {
    diaryEmotionStore.emotionDaily.emotion = '';

    return active.value == index ? active.value = -1 : active.value = index
  }
  diaryEmotionStore.emotionDaily.emotion = emotion.emotion;
  return active.value == index ? active.value = -1 : active.value = index
}

const emotions = ref<IEmotion[]>([
  {
    icon: 'img:/emotion-manager/icons/happy.svg',
    emotion: 'Happy'
  },
  {
    icon: 'img:/emotion-manager/icons/sad.svg',
    emotion: 'Sad'
  },
  {
    icon: 'img:/emotion-manager/icons/neutral.svg',
    emotion: 'Neutral'
  },
  {
    icon: 'img:/emotion-manager/icons/relaxed.svg',
    emotion: 'Relaxed'
  },
  {
    icon: 'img:/emotion-manager/icons/angry.svg',
    emotion: 'Angry'
  },
  {
    icon: 'img:/emotion-manager/icons/confused.svg',
    emotion: 'Confused'
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
