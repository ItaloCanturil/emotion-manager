<template>
  <q-page class="home row items-center justify-center">
    <div
      class="tw-flex tw-flex-col tw-bg-emo-bg-gray tw-rounded tw-p-4 tw-h-screen tw-w-full tw-gap-8"
    >
      <section class="home__titles">
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
          <q-btn rounded flat to="/user/">
            <q-icon name="eva-person-outline" size="14px"></q-icon>
          </q-btn>
          <p>{{ currentDate }}</p>
          <q-btn rounded flat @click="handleLogout()">
            <q-icon name="eva-log-out-outline" size="14px"></q-icon>
          </q-btn>
        </div>
        <h1 class="home__title tw-leading-normal tw-self-end tw-mt-auto">
          Hi, {{ username }}
        </h1>
      </section>


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

      <div class="tw-flex-1"></div>
      <q-btn
        class="home__btn tw-bg-primary tw-h-10"
        :disable="!isValid"
        @click="handleFinish"
      >
        Finish
      </q-btn>
      <!-- <q-btn
        class="home__btn tw-bg-primary tw-h-10"
        @click="handleHistory"
      >
        History
      </q-btn> -->

      <div class="tw-flex tw-justify-center tw-relative" v-if="false">
        <div
          class="tw-w-4/5 tw-mx-auto tw-h-10 tw-bg-second tw-rounded tw-stick tw-bottom-2"
        >
          <div>
            <q-icon icon=""></q-icon>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { IEmotion } from 'components/models';
import EmotionBox from 'components/EmotionBox.vue';
import { computed, onMounted, ref } from 'vue';
import { useDateFormat, useNow } from '@vueuse/core';
import { useDiaryEmotion } from 'src/stores/diaryEmotion';
import { useUserStore } from 'src/stores/user-store';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();
const userStore = useUserStore();
const diaryEmotionStore = useDiaryEmotion();

const currentDate = useDateFormat(useNow(), 'DD/MM/YYYY HH:mm');

const testHistory = ref('');
const active = ref<number>();

const isValid = computed(() => Boolean(diaryEmotionStore.emotionDaily.description) &&
Boolean(diaryEmotionStore.emotionDaily.emotion));

const username = computed(() => {
  if (typeof userStore.user === 'object' && userStore.user !== null) {
    const user = userStore.user as { raw_user_meta_data?: { name?: string } };
    return user.raw_user_meta_data && user.raw_user_meta_data.name ? user.raw_user_meta_data.name : 'User'
  }

  return 'User'
});

const handleFinish = async () => {
  try {
    const res = await diaryEmotionStore.addDailyEmotion({
      emotion: emotions.value[active.value as number].emotion,
      description: diaryEmotionStore.emotionDaily.description,
      user_id: userStore.user.id
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

// const handleHistory = () => {
//   const res = diaryEmotionStore.recoveryHistory(u)
//   console.log('🚀 ~ handleHistory ~ res:', res)

//   testHistory.value = res;
// }

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

const handleLogout = async () => {
  try {
    await userStore.logout()

    router.push({ name: 'Login'})
  } catch (error) {
    $q.notify({
      message: error as string,
      position: 'bottom'
    })
  }
}

onMounted(() => {
  userStore.getProfile();

  if (userStore.user == null) {
    $q.notify({
      message: 'Complete seu cadastro para adicionar o que você sente',
      position: 'bottom',
      actions: [{ label: 'Clique aqui', handler: () => { router.push('user')}}]
    })
  }
})
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
