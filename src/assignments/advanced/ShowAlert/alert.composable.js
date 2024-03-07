import { useStorage } from '@vueuse/core';

// https://vueuse.org/core/useStorage/
export default function useAlert (alertKey, initialData, validator) {
  // TODO: use vueuse/useStorage

  const data = useStorage(alertKey, initialData, localStorage, {
    serializer: {
      read: (v) => v ? JSON.parse(v) : null,
      write: (v) => JSON.stringify(v),
    }
  });

  return {
    data,
    isRequired: true,
    updateData: () => {
      if (validator(data)) {
        data.value.clicks++
      }
    }
  }
}