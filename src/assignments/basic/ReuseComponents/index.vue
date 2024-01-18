<script>
import { defineComponent } from 'vue'
// import { useApi } from './helpers/useApi'

export default defineComponent({
  name: 'ReuseComponents',
  setup() {
    //TODO:  const api = useApi();
    const products = [] // await api.fetchProducts()

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
    <div class="product-card" v-for="product in products" :key="product.id">
      <div class="thumbnail">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="content">
        <h2 class="title">{{ product.title }}</h2>
        <p class="price">{{ product.price }}$</p>
      </div>
      <div class="cta">
        <button @click="addProduct">+</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./reuse-components.scss" />
