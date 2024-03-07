<script>
import { defineComponent, ref } from 'vue'
import ProductCard from './components/ProductCard/index.vue'
import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'ReuseComponents',
  components: {
    ProductCard
  },
  setup() {
    const products = ref([]);
    const { fetchProducts } = useApi();

    fetchProducts().then(prds => {
      products.value = prds
    })

    // This works too 
    // (async () => {
    //   products.value = await fetchProducts();
    // })()

    return {
      products
    }
  }
})
</script>

<template>
  <div class="product-grid">
    <template v-for="product in products" :key="product.id">
      <product-card :product="product" />
    </template>
  </div>
</template>

<style lang="scss" src="./reuse-components.scss" />
