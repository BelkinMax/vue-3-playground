import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

// https://vueuse.org/core/useStorage/
export default function useAlert(alertKey, initialData, validator) {
  let count = useStorage(alertKey, initialData.clicks)

  return {
    data: { clicks: count },
    isRequired: computed(()=> ( validator(count) )),
    updateData: () => { count.value++ }
  }
}
