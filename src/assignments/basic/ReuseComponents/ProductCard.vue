<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  emits: ['productAdded'],
  setup (props, ctx) {
    
    function productAdded() {
      ctx.emit('productAdded', props.product)
    }

    return {
      productAdded
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
      <button @click="productAdded()">+</button>
    </div>
  </div>
</template>

<style lang="scss" src="./reuse-components.scss" />
