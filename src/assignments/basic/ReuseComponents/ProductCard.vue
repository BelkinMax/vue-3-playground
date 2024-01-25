<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductCard',
  props: {
    id: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    function addProduct() {
      console.log(`${this.id}: ${this.title} added!`)
    }

    return {
      addProduct
    };
  }
})
</script>

<template>
  <div class="product-card" :key="id">
    <div class="thumbnail">
      <img :src="image" :alt="title" />
    </div>
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <p class="price">{{ price }}$</p>
    </div>
    <div class="cta">
      <button @click="addProduct">+</button>
    </div>
  </div>
</template>