<script setup>
import { defineEmits, defineProps } from 'vue';

const { product } = defineProps({ product: Object });
const emit = defineEmits(['productAdd']);

function onProductAddClick () {
  emit('productAdd');
}
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
      <button @click="onProductAddClick">+</button>
    </div>
  </div>
</template>
