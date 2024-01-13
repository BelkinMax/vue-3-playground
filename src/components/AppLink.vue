<script>
import { RouterLink } from 'vue-router'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AppLink',
  inheritAttrs: false,
  components: {
    RouterLink
  },
  props: {
    ...RouterLink.props,
    to: String
  },
  setup(props) {
    const isExternalLink = computed(() => {
      return props.to.startsWith('http')
    })

    return {
      isExternalLink
    }
  }
})
</script>

<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <RouterLink v-else v-bind="$props" custom v-slot="{ href, navigate }">
    <a v-bind="$attrs" :href="href" @click="navigate">
      <slot />
    </a>
  </RouterLink>
</template>

<style lang="scss" scoped>
a,
a:link,
a:active,
a:visited {
  font-size: 12px;
  color: var(--color-text);
  text-decoration: none;
}
</style>
