import { useStorage } from '@vueuse/core';
import { ref } from 'vue';
import { watchDeep } from '@vueuse/core';
// https://vueuse.org/core/useStorage/
export default function useAlert (alertKey, initialData, validator) {
  // TODO: use vueuse/useStorage
  const data = useStorage(alertKey, initialData);

  const isRequired = ref(validator(data));

  watchDeep(data, () => {
    isRequired.value = validator(data);
  });

  function updateData () {
    data.value.clicks++;
  }

  return {
    data,
    isRequired,
    updateData
  }
}