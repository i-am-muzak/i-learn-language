<template>
  <div class="container mx-auto">
    <div v-html="text"></div>
    <div>----------------------------------</div>
    <div class="words text-justify">
      <span class="word" v-for="word in computedWords">
        {{ word.trimStart() }}
      </span>
  </div>
  </div>
</template>

<script lang="ts">
  import { start } from "repl";
import { defineComponent } from "vue";
  export default defineComponent({
    data() {
      return {
        text: "As I woke up this morning, I realized that I had slept in and was running late for work. I quickly got out of bed and started to get ready. I made myself some coffee and had a quick breakfast before heading out the door. As I was walking to the train station, I noticed that the weather was really nice and sunny. I felt grateful for the beautiful day and tried to enjoy my walk as much as possible. When I finally got to work, my boss asked me if I had finished the report that he had assigned to me. I said that I had not yet had a chance to start it, but that I would do my best to get it done by the end of the day. How can it happen? Yes!" as string
      }
    },
    computed: {
      computedWords() {
        const sentences = this.text.split(/[.?!]+/)
        var modifiedSentences = []
        for (let i = 0; i < sentences.length; i++) {
          const sentence = sentences[i];
          if(sentence) {
            const start_idx = this.text.indexOf(sentence)
            modifiedSentences.push(this.text.substring(start_idx, start_idx + sentence.length + 1))
          }
        }
        return modifiedSentences
      }
    },
  })
</script>

<style lang="scss">
.word {
  transition: .2s ease-in-out;
  user-select: none;
  margin-right: 4px;
  font-size: 14px;
  &:hover {
    background-color: #d8edd7;
    cursor: pointer;
  }
}
</style>
