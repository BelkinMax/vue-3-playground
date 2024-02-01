<script>
import { defineComponent, reactive, computed } from 'vue'

export default defineComponent({
  name: 'FindShopCartBug',
  setup() {
    const products = reactive([
      {
        id: 1,
        name: 'Mouse - Logitech MX Master 3S',
        price: 9220,
        quantity: 1
      },
      {
        id: 2,
        name: 'Keyboard - Logitech MX Keys',
        price: 7990,
        quantity: 1
      },
      {
        id: 3,
        name: 'WebCam - Logitech HD Pro Webcam C920',
        price: 6890,
        quantity: 1
      }
    ])
    const total = computed(() => products.reduce((acc, product) => acc + product.price * product.quantity, 0) / 100)



    function increaseQuantity(product) {
      product.quantity += 1
    }

    function decreaseQuantity(product) {
      if (product.quantity > 0) {
        product.quantity -= 1
      }
    }

    return {
      products,
      total,
      increaseQuantity,
      decreaseQuantity
    }
  }
})
</script>

<template>
  <div class="cart-container">
    <ul class="cart-list">
      <li v-for="product in products" :key="product.id" class="cart-item">
        <span class="cart-item-content">
          <span class="item-heading">{{ product.name }}</span>
          <span>${{ product.price / 100 }}</span>
          <span class="qty-selector">
            <button class="selector-btn" @click="decreaseQuantity(product)">-</button>
            <span class="qty-number">{{ product.quantity }}</span>
            <button class="selector-btn" @click="increaseQuantity(product)">+</button>
          </span>
          <span class="cart-price"> ${{ (product.price * product.quantity) / 100 }} </span>
        </span>
      </li>
    </ul>
    <p class="cart-total">
      <span>Total:</span>
      <span class="total-number">${{ total }}</span>
    </p>
  </div>
</template>

<style lang="scss" src="./find-shop-cart-bug.scss" />
