<template>
  <div v-if="task">
    <div class="flex flex-col">
      <div class="flex items-center justify-between">
        <h1 class="text-[16px] text-gray-700">{{ task.title }}</h1>
        <span
          class="d-inline-block ml-2 px-2 py-1 text-[11px] bg-orange-50 text-orange-500"
          >{{ task.status_text }}</span
        >
      </div>
      <div class="mt-2 text-[13px] text-gray-500">
        {{ task.reminder }}
      </div>
      <div class="mt-3 flex items-center justify-between">
        <div>
          <span
            v-for="(word, wordIndex) in task.words"
            :key="wordIndex"
            class="text-rose-500 bg-rose-50 d-inline-block px-2 py-1 rounded mr-1 text-[11px] hover:bg-rose-100"
          >
            {{ word }}
          </span>
        </div>
        <span class="text-[11px] text-gray-400"> 26.05.2023 </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
