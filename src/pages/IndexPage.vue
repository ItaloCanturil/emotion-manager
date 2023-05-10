<template>
  <q-page class="column items-center justify-evenly">
    <h3 class="text-gray-500">Hi, User</h3>
    <!-- <h1>How are you feeling today?</h1> -->

    <div class="tw-flex tw-w-full tw-justify-center tw-overflow-scroll tw-scrollbar-hide">
      <EmotionBox class="tw-mx-3" v-for="emotion in emotions" :key="emotion.emotion" :icon="emotion.icon" :emotion="emotion.emotion"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { IEmotion } from 'components/models';
import EmotionBox from 'components/EmotionBox.vue';
import { ref } from 'vue';

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
    emotion: 'Happy'
  },
  {
    icon: 'fa-solid fa-face-laugh-beam',
    emotion: 'Happy'
  },
  {
    icon: 'fa-solid fa-face-laugh-beam',
    emotion: 'Happy'
  },
  {
    icon: 'fa-solid fa-face-laugh-beam',
    emotion: 'Happy'
  },
]);
</script>
