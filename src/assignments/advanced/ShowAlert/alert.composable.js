import { useStorage } from '@vueuse/core';
import { reactive } from 'vue'
export default function useAlert (alertKey, initialData, validator) {
  const clicks = useStorage('clicks', initialData.clicks);
  const isRequired = useStorage('is-required', true);
  const data = reactive({
    clicks
  });

  return {
    data,
    isRequired,
    updateData: () => {
      if (!validator(data)) {
        isRequired.value = false;
        return;
      }
      clicks.value++;
    }
  }
}