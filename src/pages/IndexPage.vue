<template>
  <q-page class="home tw-grid">
    <h1 class="home__title tw-leading-normal tw-self-end">Hi, User</h1>
    <!-- <h1>How are you feeling today?</h1> -->

    <div class="home__emotion tw-flex tw-w-full tw-overflow-scroll tw-scrollbar-hide  tw-self-start ">
      <EmotionBox class="tw-mx-3 tw-text-gray-400" :class="{'tw-bg-primary' : active == index}"  v-for="(emotion, index) in emotions" :key="emotion.emotion" :icon="emotion.icon" :emotion="emotion.emotion" @click="() => active == index ? active = -1 : active = index"/>
    </div>

    <div class="home__wrapper tw-bg-second">
      <q-input
        color="#E2E2E2"
        v-model="textFeeling"
        label="Describe your day:"
        type="textarea"
      />
    </div>
    <q-btn class="home__btn tw-bg-primary tw-h-10 tw-mt-auto">
      Finish the day
    </q-btn>
  </q-page>

</template>

<script setup lang="ts">
import { IEmotion } from 'components/models';
import EmotionBox from 'components/EmotionBox.vue';
import { ref } from 'vue';

const active = ref<number>();

const textFeeling = ref('');

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
  grid-template-areas:
      "titles"
      "feelings"
      "texts"
      "btn"
      ;

  &__title  {
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
