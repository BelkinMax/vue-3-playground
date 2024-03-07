import { useStorage } from '@vueuse/core';
import { computed } from 'vue';

// https://vueuse.org/core/useStorage/
export default function useAlert (alertKey, initialData, validator) {
  const state = useStorage(alertKey, initialData);
  const isRequired = computed(() => validator(state));

  const updateData = (data) => {
    if (isRequired.value) {
      state.value = data;
    }
  }

  return {
    data: state,
    isRequired,
    updateData
  };
}