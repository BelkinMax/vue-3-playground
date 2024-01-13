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
      'simple-counter': defineAsyncComponent(() => import('@/assignments/basic/SimpleCounter/index.vue')),
      'reuse-components': defineAsyncComponent(() => import('@/assignments/basic/ReuseComponents/index.vue')),
      'credit-card-form': defineAsyncComponent(() => import('@/assignments/basic/CreditCardForm/index.vue')),
      'jokes-api': defineAsyncComponent(() => import('@/assignments/basic/JokesApi/index.vue')),
      'calculator-app': defineAsyncComponent(() => import('@/assignments/basic/CalculatorApp/index.vue')),
      'find-shop-cart-bug': defineAsyncComponent(() => import('@/assignments/basic/FindShopCartBug/index.vue'))
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
