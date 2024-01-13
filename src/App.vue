<script>
import { defineComponent, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppLink from '@/components/AppLink.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppLink,
    RouterView
  },
  setup() {
    const route = useRoute()
    const showBackNavigation = computed(() => route.path !== '/')

    return {
      showBackNavigation
    }
  }
})
</script>

<template>
  <nav v-if="showBackNavigation" class="navigation">
    <AppLink to="/">◀️ Back</AppLink>
  </nav>

  <main class="main">
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.navigation {
  padding: 0 20px;
  margin-bottom: 20px;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>