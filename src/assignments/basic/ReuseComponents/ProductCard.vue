<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductCard',
  props: ['image', 'title', 'price', 'product'],
  emits: ['added-product'],
  setup(_, { emit }) {

    function addProduct (product) {
        emit('added-product', product);
    }

    return {
      addProduct
    }
  }
})
</script>

<template>
  <div class="product-grid">
    <div class="product-card">
      <div class="thumbnail">
        <img :src="image" :alt="title" />
      </div>
      <div class="content">
        <h2 class="title">{{ title }}</h2>
        <p class="price">{{ price }}$</p>
      </div>
      <div class="cta">
        <button @click="addProduct(product)">+</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./reuse-components.scss" />
