import { useStorage } from '@vueuse/core';
import {computed} from "vue";

// https://vueuse.org/core/useStorage/
export default function useAlert (alertKey, initialData, validator) {
  const _storedData = useStorage(alertKey, initialData, localStorage);
  const isRequired = computed(() => !!validator(_storedData));

  const updateData = (newData) => {
    _storedData.value = newData;
  }

  return {
    get data () {
      return _storedData;
    },
    isRequired,
    updateData
  }
}