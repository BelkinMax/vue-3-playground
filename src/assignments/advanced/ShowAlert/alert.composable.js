import { computed } from 'vue';
import { useStorage } from '@vueuse/core';

// https://vueuse.org/core/useStorage/
export default function useAlert (alertKey, initialData = {}, validator) {
  const state = useStorage(
    alertKey,
    initialData
  )

  const updateData = (newData) => {
    state.value = newData;
  }

  const isRequired = computed(() => validator(state));

  return {
    data: state,
    isRequired,
    updateData: (newData) => updateData(newData),
  }
}