<script>
import { defineComponent, onMounted, reactive, ref, watch, nextTick } from 'vue'
import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'QuotesChat',
  setup() {
    const api = useApi()
    const history = reactive([]);
    let question = ref('');
    let isLoading = ref(false);
    const inputQuestion = ref(null);

    onMounted(() => {
      inputQuestion.value.focus();
    });


    watch(question, async (newValue) => {
      if (newValue.includes('.')) {
        toggleLoading(true);
        const response = await api.fetchQuote(question.value);
        addToHistory(question.value, response);
        clearInput();
        toggleLoading(false);
        await nextTick();
        inputQuestion.value.focus();
      } else {
        toggleLoading(false);
      }
    });

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
      inputQuestion
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
      <input v-model="question" :disabled="isLoading" class="input" ref="inputQuestion" />
    </div>
  </div>
</template>

<style lang="scss" src="./quotes-chat.scss" />
