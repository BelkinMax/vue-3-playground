import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core';

// https://vueuse.org/core/useStorage/
export default function useAlert (alertKey, initialData, validator) {
  const state = useStorage(alertKey, initialData)
  const data = ref(state.value)
  const isRequired = computed(() => validator(data))


  function updateData (newData) {
    data.value = newData
    state.value = newData
  }

  return {
    data,
    isRequired,
    updateData
  }
}