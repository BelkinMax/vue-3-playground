<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useApi } from './helpers/useApi'
import Card from './components/Card.vue'

export default defineComponent({
  name: 'ReuseComponents',
  components: {
    Card
  },
  setup() {
    const api = useApi();
    const products = reactive([]);
    
    onMounted(async () => {
      const newProducts = await api.fetchProducts()
      products.push(...newProducts);
    })

    function addProduct(product) {
      console.log(`${product.id}: ${product.title} added!`)
    }

    return {
      products,
      addProduct
    }
  }
})
</script>

<template>
  <div class="product-grid">
    <Card
      v-for="product in products"
      :key="product.id"
      v-bind="product"
      @clicked="addProduct(product)"
    />
  </div>
</template>

<style lang="scss" src="./reuse-components.scss" />
