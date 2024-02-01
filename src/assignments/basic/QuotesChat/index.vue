<script>
import { defineComponent, ref, watch } from 'vue'
import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'QuotesChat',
  setup() {
    const api = useApi()
    const history = []
    let question = ref('');
    let isLoading = false

    watch(
        () => question.value.includes('.'),
        (hasDot) => {
            if (!hasDot || !question.value) {
                return
            }
            onStartChatInteraction();
      }
    );

    async function onStartChatInteraction () {
      toggleLoading(true);
      try {
          const answer = await api.fetchQuote(question.value);
          addToHistory(question.value, answer);
      } catch (e) {
          console.log(e);
      }
      clearInput();
      toggleLoading(true);
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
        question: question,
        answer
      })
    }

    function toggleLoading(val) {
      isLoading = val
    }

    return {
      history,
      question,
      isLoading
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
      <input v-model="question" :disabled="isLoading" class="input" />
    </div>
  </div>
</template>

<style lang="scss" src="./quotes-chat.scss" />
