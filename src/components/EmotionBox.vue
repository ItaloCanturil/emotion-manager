<template>
  <div class="tw-flex tw-flex-col tw-rounded-lg tw-bg-[#E2E2E2] tw-py-3 tw-px-4 tw-cursor-pointer tw-items-center">
    <div class="tw-text-purple-800">
      <q-icon :name="props.icon" size="md"/>
    </div>

    <p>{{ props.emotion }}</p>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  icon: { type: String },
  emotion: { type: String },
})
</script>
