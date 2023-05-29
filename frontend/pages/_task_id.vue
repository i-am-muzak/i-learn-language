<template>
  <div class="pb-4">
    <div
      class="container mx-auto max-w-[760px] bg-white rounded p-4 mt-4 task-section"
    >
      <div class="flex flex-col pb-8">
        <div class="mb-2">
          <a-breadcrumb>
            <a-breadcrumb-item>
              <nuxt-link to="/"> Dashboard </nuxt-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>Task #2382</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <h1 class="text-[18px] m-0">Task #2382</h1>
        <div class="text-[11px] text-gray-500">23.03.2023 - 22:35</div>
      </div>
      <div v-for="(item, index) in data" :key="index" class="flex flex-col">
        <div class="flex items-center justify-between">
          <h1
            class="font-semibold m-0 capitalize text-blue-900 font-inter text-[13px] text-[20px]"
          >
            {{ item.word }}
          </h1>

          <span
            class="text-[10px] text-orange-700 bg-orange-100 rounded-full px-2 py-1 hover:bg-orange-200 font-inter font-semibold"
            >intermediate</span
          >
        </div>
        <div class="text-[12px] italic text-blue-900">
          {{ item.part_of_speech }}
        </div>
        <div class="mt-4 font-inter">
          <div
            v-for="(definition, definitionIndex) in item.definition"
            class="definition font-semibold text-[16px]"
            :class="definitionIndex !== 0 ? 'mt-5' : ''"
          >
            <div>
              <span class="cursor-pointer hover:bg-lime-50">{{ definition.detail }}</span>
              <span class="text-rose-800"
                >({{ definition.part_of_speech }})</span
              >
            </div>

            <div class="mt-4 text-[14px] font-normal">
              <ul
                class="list-disc pl-6"
                v-if="hasPartOfSpeechSentence(definition, item.sentences)"
              >
                <li
                  v-for="sentence in item.sentences.filter(
                    (x) => x.type === definition.part_of_speech
                  )"
                  class="italic mt-2 hover:underline cursor-pointer"
                >
                  {{ sentence.detail }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <a-checkbox>Gotcha...</a-checkbox>
        </div>
        <a-divider v-if="index !== data.length - 1"></a-divider>
      </div>
      <a-divider></a-divider>
      <div class="flex justify-end">
        <a-button type="primary">Prepare Exam</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          word: "release",
          definition: [
            {
              detail:
                "The act of setting something free or making it available.",
              part_of_speech: "noun",
            },
            {
              detail: "To set free or make available for use.",
              part_of_speech: "verb",
            },
          ],
          part_of_speech: "Noun, Verb",
          sentences: [
            {
              detail:
                "The release of the new smartphone model generated a lot of excitement among consumers.",
              type: "noun",
            },
            {
              detail:
                "The company plans to release its latest software update next week.",
              type: "verb",
            },
          ],
          level: "intermediate",
        },
        {
          word: "make",
          definition: [
            {
              detail: "To create or produce something.",
              part_of_speech: "verb",
            },
            {
              detail: "A particular brand or type of product.",
              part_of_speech: "noun",
            },
          ],
          part_of_speech: "Verb, Noun",
          sentences: [
            {
              detail: "She can make delicious homemade cookies.",
              type: "verb",
            },
            { detail: "Which make of car do you prefer?", type: "noun" },
          ],
          level: "beginner",
        },
        {
          word: "claqueur",
          definition: [
            {
              detail:
                "A person paid to applaud or heckle during a performance, especially in the theater.",
              part_of_speech: "noun",
            },
          ],
          part_of_speech: "Noun",
          sentences: [
            {
              type: "noun",
              detail:
                "The famous actor had a claqueur in the audience who would cheer loudly at his every line.",
            },
            {
              type: "noun",
              detail:
                "The stand-up comedian was often interrupted by a claqueur who tried to heckle him.",
            },
          ],
          level: "advanced",
        },
        {
          word: "aments",
          definition: [
            {
              detail:
                "Catkins or long tassel-like inflorescences found on certain trees, such as willows and poplars.",
              part_of_speech: "noun",
            },
          ],
          part_of_speech: "Noun",
          sentences: [
            {
              type: "noun",
              detail:
                "The famous actor had a claqueur in the audience who would cheer loudly at his every line.",
            },
            {
              type: "noun",
              detail:
                "The stand-up comedian was often interrupted by a claqueur who tried to heckle him.",
            },
          ],
          level: "intermediate",
        },
        {
          word: "armrest",
          definition: [
            {
              part_of_speech: "noun",
              detail:
                "A support for the arm, usually found on chairs, sofas, or vehicles.",
            },
          ],
          part_of_speech: "Noun",
          sentences: [
            {
              type: "noun",
              detail:
                "The famous actor had a claqueur in the audience who would cheer loudly at his every line.",
            },
            {
              type: "noun",
              detail:
                "The stand-up comedian was often interrupted by a claqueur who tried to heckle him.",
            },
          ],
          level: "beginner",
        },
      ],
    };
  },
  methods: {
    hasPartOfSpeechSentence(definition, sentences) {
      const def_part_of_speech = definition.part_of_speech;
      for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i];
        if (sentence.type.toLowerCase() === def_part_of_speech.toLowerCase()) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style lang="less" scoped>
.task-section {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.definition {
  color: rgba(0, 0, 0, 0.78);
}

::v-deep .ant-checkbox-wrapper {
  span {
    font-size: 12px !important;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>
