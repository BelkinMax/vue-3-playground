<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useApi } from './helpers/useApi'
import  ProductCard  from './ProductCard.vue';

export default defineComponent({
  name: 'ReuseComponents',
  components : {
    ProductCard
  },
  setup() {
    const api = useApi();
    let products = reactive([]);

    onMounted (async () => {
      const data = await api.fetchProducts();
      products.push(...data);
    });

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
    <ProductCard v-for="product in products" :key="product.id"
      :image="product.image"
      :title="product.title"
      :price="product.price"
      :product="product"
      @added-product="addProduct"
    />
  </div>
</template>

<style lang="scss" src="./reuse-components.scss" />
