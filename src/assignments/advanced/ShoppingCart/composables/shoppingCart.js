/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 */
import { reactive, computed } from 'vue'

export default function useShoppingCart() {

  const cart = reactive([])

  const total = computed(() => cart.reduce((prev, current) => prev + current.price, 0))

  function addToCart (item) {
    cart.push(item)
  }

  function removeFromCart (id) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
      cart.splice(index, 1)
    }
  }

  return {
    cart,
    total,
    addToCart,
    removeFromCart
  }
}