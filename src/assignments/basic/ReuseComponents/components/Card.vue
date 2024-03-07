<script>
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['clicked'],
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }
})
</script>

<template>
  <div class="product-card">
    <div class="thumbnail">
      <img :src="image" :alt="title" />
    </div>
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <p class="price">{{ price }}$</p>
    </div>
    <div class="cta">
      <button @click="() => $emit('clicked')">+</button>
    </div>
  </div>
</template>