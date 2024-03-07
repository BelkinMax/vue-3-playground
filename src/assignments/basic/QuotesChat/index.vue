<script>
import { defineComponent, ref, watch } from 'vue'
import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'QuotesChat',
  setup() {
    const api = useApi()
    const history = []
    let question = ref('')
    let isLoading = ref(false)

    function clearInput() {
      question.value = ''
    }

    watch(question, async (value) => {
      if (value.includes('.')) {
        toggleLoading(true)
        try {
          const answer = await api.fetchQuote(value);
          addToHistory(value, answer)
          clearInput()
        } catch (error) {
          console.error('Error! Could not reach the API. ' + error);
        } finally {
          toggleLoading(false)
        }
      }
    })

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
