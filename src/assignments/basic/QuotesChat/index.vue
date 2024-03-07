<script>
import { defineComponent, onMounted, watch, ref, computed, reactive, nextTick } from 'vue'
import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'QuotesChat',
  setup() {
    const api = useApi();
    const history = reactive([]);
    const question = ref('');
    const questionIncludesDot = computed(() => question.value.includes('.'));
    const isLoading = ref(false);
    const inputRef = ref(null);

    onMounted(focusInput);

    watch(questionIncludesDot, async () => {
      if (!questionIncludesDot.value) {
        return;
      }
      try {
        toggleLoading(true);
        const answer = await api.fetchQuote(question.value);
        addToHistory(question.value, answer);
        clearInput();
        nextTick(focusInput);
      } catch (err) {
        console.error('ERROR :::', err);
      } finally {
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

    function focusInput() {
      inputRef.value.focus();
    }

    return {
      history,
      question,
      inputRef,
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
      <input v-model="question" :disabled="isLoading" class="input" ref="inputRef" />
    </div>
  </div>
</template>

<style lang="scss" src="./quotes-chat.scss" />
