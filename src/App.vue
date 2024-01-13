<script>
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    RouterLink,
    RouterView
  },
  setup() {
    const linkList = [{ title: '📁 Docs', to: '/' }]

    return {
      linkList
    }
  }
})
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <nav class="navigation">
        <RouterLink v-for="link in linkList" :key="link.title" :to="link.to">
          {{ link.title }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <main class="main">
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.header {
  line-height: 1.5;
  max-height: 100vh;

  .navigation {
    width: 100%;
    font-size: 12px;
    border: 1px solid var(--color-border);
    margin-bottom: 1rem;
    padding: 1rem 0;
    border-radius: 10px;

    a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);
      text-decoration: none;

      .router-link-exact-active {
        color: var(--color-text);
      }

      &:first-of-type {
        border: none;
      }
    }
  }
}
</style>
