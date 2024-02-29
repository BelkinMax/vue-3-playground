<script>
import { defineComponent, reactive } from 'vue'
import useShoppingCart from './composables/shoppingCart.js';

export default defineComponent({
  name: 'ShoppingCart',
  setup() {
    const {
        productCart: cart,
        total,
        addToCart,
        removeFromCart
    } = useShoppingCart();
    const products = reactive([
      { id: 1, name: 'Mouse - Logitech MX Master 3S', price: 9220 },
      { id: 2, name: 'Keyboard - Logitech MX Keys', price: 7990 },
      { id: 3, name: 'WebCam - Logitech HD Pro Webcam C920', price: 6890 }
    ])

    return {
      products,
      cart,
      total,
      addToCart,
      removeFromCart
    }
  }
})
</script>

<template>
  <div class="cart-container">
    <h2>Products</h2>
    <ul class="cart-list">
      <li v-for="product in products" :key="product.id" class="cart-item">
        <span class="cart-item-content">
          <span class="item-heading">{{ product.name }}</span>
          <span>${{ product.price / 100 }}</span>
          <span class="qty-selector">
            <button class="selector-btn" @click="addToCart(product)">Add</button>
          </span>
        </span>
      </li>
    </ul>

    <h2>Cart</h2>
    <ul class="cart-list">
      <li v-for="product in cart" :key="product.id" class="cart-item">
        <span class="cart-item-content">
          <span class="item-heading">{{ product.name }}</span>
          <span>${{ product.price / 100 }}</span>
          <span class="qty-selector">
            <button class="selector-btn" @click="removeFromCart(product.id)">Remove</button>
          </span>
        </span>
      </li>
    </ul>
    <p class="cart-total">
      <span>Total:</span>
      <span class="total-number">${{ total / 100 }}</span>
    </p>
  </div>
</template>

<style lang="scss" src="./shopping-cart.scss" />
