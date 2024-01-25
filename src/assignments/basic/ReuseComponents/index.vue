<script>
import {defineComponent, ref, onMounted} from 'vue'
import {useApi} from './helpers/useApi'
import ProductCard from './ProductCard.vue';

export default defineComponent({
  name: 'ReuseComponents',
  components: { ProductCard },
  setup() {
    const api = useApi();
    const products = ref([]);

    function addProduct(product) {
      console.log(`${product.id}: ${product.title} added!`)
    }

    onMounted(async () => {
      products.value = await api.fetchProducts();
    });

    return {
      products,
      addProduct
    }
  }
});
</script>

<template>
  <div class="product-grid">
    <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        @product-add="addProduct(product)"
    />
  </div>
</template>

<style lang="scss" src="./reuse-components.scss"/>
