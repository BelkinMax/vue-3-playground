<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useApi } from './helpers/useApi';
import ProductCard from '@/assignments/basic/ReuseComponents/ProductCard.vue';

export default defineComponent({
  name: 'ReuseComponents',
  components: {
    ProductCard,
  },
  setup() {
    const api = useApi();
    const products = reactive([]);

    onMounted(async () => {
      const res = await api.fetchProducts();
      products.push(...res);
    });

    return {
      products
    }
  }
})
</script>

<template>
  <div class="product-grid">
    <ProductCard
      v-for="(product, index) in products"
      :key="index"
      :id="product.id"
      :image="product.image"
      :title="product.title"
      :price="product.price"
    />
  </div>
</template>

<style lang="scss" src="./reuse-components.scss" />
