<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({ product: Object });
const emit = defineEmits(['productAdd']);

function onProductAddClick () {
  emit('productAdd');
}
</script>

<template>
  <div class="product-card">
    <div class="thumbnail">
      <img :src="props.product.image" :alt="props.product.title" />
    </div>
    <div class="content">
      <h2 class="title">{{ props.product.title }}</h2>
      <p class="price">{{ props.product.price }}$</p>
    </div>
    <div class="cta">
      <button @click="onProductAddClick">+</button>
    </div>
  </div>
</template>
