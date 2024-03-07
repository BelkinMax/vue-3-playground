<script>
import { defineComponent } from 'vue'
import AppLink from '@/components/AppLink.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    AppLink
  },
  setup() {
    const linkList = [
      [
        '📁 Basics',
        [
          [
            ['📄 Reactivity Fundamentals', 'https://vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state'],
            ['📄 Props', 'https://vuejs.org/guide/components/props.html'],
            ['📄 Events', 'https://vuejs.org/guide/components/props.html'],
            ['📄 Methods', 'https://vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-methods'],
            ['📄 Computed', 'https://vuejs.org/guide/essentials/computed.html#basic-example'],
            ['📄 Watchers', 'https://vuejs.org/guide/essentials/watchers.html#watchers'],
            ['📄 Template Refs', 'https://vuejs.org/guide/essentials/template-refs.html#template-refs'],
            ['📄 Form Input Bindings', 'https://vuejs.org/guide/essentials/forms.html'],
            ['📄 Lifecycle Hooks', 'https://vuejs.org/guide/essentials/lifecycle.html'],
            ['📄 Async Components', 'https://vuejs.org/guide/components/async.html#basic-usage']
          ],
          [
            ['⚙️ Simple Counter', '/simple-counter'],
            ['⚙️ Reuse Components', '/reuse-components'],
            ['⚙️ Credit Card Form', '/credit-card-form'],
            ['⚙️ Calculator App', '/calculator-app'],
            ['⚙️ Quotes Chat', '/quotes-chat'],
            ['⚙️ Find Shop Cart Bug', '/find-shop-cart-bug']
          ]
        ]
      ],
      [
        '📁 Advanced',
        [
          [
            ['📄 Composable', 'https://vuejs.org/guide/reusability/composables.html'],
            ['📄 Transitions', 'https://vuejs.org/guide/built-ins/transition.html'],
            ['📄 Teleport', 'https://vuejs.org/guide/built-ins/teleport.html'],
            ['📄 Slots', 'https://vuejs.org/guide/components/slots.html'],
            ['📄 Directives', 'https://vuejs.org/api/built-in-directives.html#built-in-directives'],
            ['📄 Plugins', 'https://vuejs.org/guide/reusability/plugins.html#plugins'],
            ['📄 Vuex Store', 'https://bluuweb.github.io/vue-udemy/21-vuex-composition/#api']
          ],
          [
            ['⚙️ Drawing App', '/drawing-app'],
            ['⚙️ Shopping Cart', '/shopping-cart'],
            ['⚙️ Show Alert', '/show-alert'],
            ['⚙️ Async Components', '/async-components']
          ]
        ]
      ],
      [
        '📁 Ecommerce App',
        [
          [
            ['⚙️ Initial Setup', '/ecommerce-app-initial-setup'],
            ['⚙️ Live Search', '/ecommerce-app-live-search'],
            ['⚙️ Add To Cart', '/ecommerce-app-add-to-cart']
          ]
        ]
      ]
    ]

    return {
      linkList
    }
  }
})
</script>

<template>
  <div class="wrapper">
    <fieldset v-for="[category, colList] in linkList" :key="category" class="category-block">
      <legend class="category-title">{{ category }}</legend>

      <ul v-for="(subjectList, idx) in colList" :key="`${category}-${idx}`" class="link-list">
        <li v-for="[title, url] in subjectList" :key="title" class="link-item">
          <AppLink :to="url">{{ title }}</AppLink>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  width: 100%;
}

.category-block {
  display: grid;
  grid-auto-flow: column;
  border: 1px solid var(--color-border);
  padding: 8px 14px 18px;
  border-radius: 10px;

  .category-title {
    padding: 0 2px;
    font-size: 12px;
  }
}

.link-list {
  padding-left: 2rem;

  .link-item {
    list-style: none;
  }
}
</style>
