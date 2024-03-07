<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ReuseComponents',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {
    function addProduct(product) {
      console.log(`${product.id}: ${product.title} added!`)
    }
    return {
      addProduct
    }
  }
})
</script>

<template>
  <div class="product-card">
    <div class="thumbnail">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="content">
      <h2 class="title">{{ product.title }}</h2>
      <p class="price">{{ product.price }}$</p>
    </div>
    <div class="cta">
      <button @click="addProduct(product)">+</button>
    </div>
  </div>
</template>
