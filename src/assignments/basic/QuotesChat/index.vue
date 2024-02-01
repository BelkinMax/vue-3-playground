<script>
import { defineComponent, reactive, ref, onMounted, watch, nextTick } from 'vue'
import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'QuotesChat',
  setup() {
    const api = useApi()
    const history = reactive([])
    let question = ref('')
    let refInput = ref(null)
    let isLoading = ref(false)

    onMounted(() => {
      focusInput()
    })

    watch(
      question,
      (value) => {
        if (!isLoading.value && value.includes('.')) {
          handleSearch(value)
        }
      }
    )

    async function handleSearch (value) {
      toggleLoading(true)

      const answer = await api.fetchQuote(value);

      addToHistory(value, answer);

      clearInput();

      toggleLoading(false)

      await nextTick()

      focusInput()
    }

    function focusInput () {
      refInput.value.focus();
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
      refInput,
      history,
      question,
      isLoading,
      handleEnter
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
      <input
        ref="refInput"
        v-model="question"
        :disabled="isLoading"
        class="input"
        @keydown.enter="handleEnter"  
      />
    </div>
  </div>
</template>

<style lang="scss" src="./quotes-chat.scss" />
