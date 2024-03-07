import { useStorage } from '@vueuse/core';

// https://vueuse.org/core/useStorage/
export default function useAlert (alertKey, initialData, validator) {
  // TODO: use vueuse/useStorage

  return {
    data: {},
    isRequired: true,
    updateData: () => {}
  }
}