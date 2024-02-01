<script>
import {defineComponent, nextTick, onMounted, reactive, ref, watch} from 'vue'
import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'QuotesChat',
  setup() {
    const api = useApi();
    const history = reactive([]);
    const question = ref('');
    const isLoading = ref(false);
    const input = ref(null)

    onMounted(() => {
      focusInput();
    })

    // TODO: focus chat input on mounted

    // TODO: Implement watcher for question.includes('.')
    watch(question, async (newQuestion) => {
      if (newQuestion.includes('.')) {
        toggleLoading(true);
        try {
          const res = await api.fetchQuote(newQuestion);
          addToHistory(newQuestion, res);
          clearInput();
        } catch (error) {
          console.log(`Error: ${error}`);
        }
        toggleLoading(false);
        await nextTick()
        focusInput();
      }
    })
    //
    // ? has dot
    // ? has value
    // - set loading true
    // - await fetch
    // - add to history
    // - clear input
    // - set loading false
    // - focus chat input

    function focusInput () {
      input.value.focus()
    }

    function clearInput() {
      question.value = ''
    }

    function addToHistory(question, answer) {
      if (history.length > 3) {
        history.shift()
      }

      history.push({
        id: new Date().getTime(),
        question,
        answer
      })
    }

    function toggleLoading(val) {
      isLoading.value = val
    }

    return {
      history,
      question,
      isLoading,
      input
    }
  }
})
</script>

<template>
  <div class="quotes-chat">
    <ul class="chat-list">
      <li v-for="chat in history" :key="chat.id" class="chat-item">
        <p class="question">You: {{ chat.question }}</p>
        <p class="answer">Chat: {{ chat.answer }}</p>
      </li>
      <li v-if="isLoading" class="chat">
        <p class="answer">...</p>
      </li>
    </ul>

    <div class="input-wrapper">
      <span class="hint">Tell me about what you want or love:</span>
      <input ref="input" v-model="question" :disabled="isLoading" class="input" />
    </div>
  </div>
</template>

<style lang="scss" src="./quotes-chat.scss" />
