<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'QuotesChat',
  setup() {
    // const inputRef = ref(null)
    const api = useApi()
    const history = []
    let question = ref('')
    let isLoading = ref(false)

    // TODO: focus chat input on mounted
    onMounted(() => {
      // inputRef.value.focus()
    })

    watch(question, async (newValue) => {
      if (newValue.includes('.')) {
        handleSubmit(newValue)
      }
    });

    async function handleSubmit(newValue) {
      toggleLoading()
      const quoteResult = await api.fetchQuote(question.value)
      addToHistory(newValue, quoteResult)
      clearInput()
      toggleLoading()
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

    function toggleLoading() {
      isLoading.value = !isLoading.value
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
      <input ref="inputRef" v-model="question" :disabled="isLoading" class="input" />
    </div>
  </div>
</template>

<style lang="scss" src="./quotes-chat.scss" />
