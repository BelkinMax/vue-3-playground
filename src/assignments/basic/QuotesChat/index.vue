<script>
import { defineComponent, watch, ref } from 'vue'
import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'QuotesChat',
  setup() {
    const api = useApi()
    const history = []
    let question = ref('')
    let isLoading = ref(false)

    watch(question, async (newValue) => {
      if (!question.value.includes('.')) return
      toggleLoading(true)
      await api.fetchQuote(newValue).then((answer) => {
        addToHistory(newValue, answer)
      })
      clearInput()
      toggleLoading(false)
    })

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
