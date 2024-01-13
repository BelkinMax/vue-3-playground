<script>
import { defineAsyncComponent, defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppLink from '@/components/AppLink.vue'

export default defineComponent({
  name: 'AssignmentView',
  components: { AppLink },
  setup() {
    const router = useRouter()
    const { params } = useRoute()

    const assignmentComponentMap = {
      'simple-counter': defineAsyncComponent(() => import('@/assignments/SimpleCounter/index.vue')),
      'reuse-components': defineAsyncComponent(() => import('@/assignments/ReuseComponents/index.vue')),
      'credit-card-form': defineAsyncComponent(() => import('@/assignments/CreditCardForm/index.vue')),
      'jokes-api': defineAsyncComponent(() => import('@/assignments/JokesApi/index.vue')),
      'calculator-app': defineAsyncComponent(() => import('@/assignments/CalculatorApp/index.vue')),
      'find-shop-cart-bug': defineAsyncComponent(() => import('@/assignments/FindShopCartBug/index.vue'))
    }
    const assignmentComponent = assignmentComponentMap[params.assignmentId];

    !assignmentComponent && router.push('/');

    return {
      assignmentComponent
    }
  }
})
</script>

<template>
  <section class="assignment">
    <component :is="assignmentComponent" />
  </section>
</template>

<style lang="scss" scoped>
.navigation {
  padding: 0 20px;
  margin-bottom: 20px;
}
</style>
