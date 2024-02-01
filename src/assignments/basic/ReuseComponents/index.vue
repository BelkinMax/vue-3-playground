<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useApi } from './helpers/useApi'
import ProductCard from './ProductCard.vue'

export default defineComponent({
  name: 'ReuseComponents',
  components: {
    ProductCard
  },
  setup () {
    const api = useApi();
    const products = ref([]); 

    onMounted(async () => {
      products.value = await api.fetchProducts(6);
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
    <template v-for="product in products" :key="product.id">
      <product-card
        :product="product"
        @productAdded="addProduct"
      />
    </template>
  </div>
</template>

<style lang="scss" src="./reuse-components.scss" />
