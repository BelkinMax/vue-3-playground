/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 */
import { reactive, computed } from "vue"

const cart = reactive([])
const total = computed(() => cart.reduce((acc, product) => acc + product.price,0))

export default function useShoppingCart() {
  return {
    addToCart (product) {
      cart.push(product)
      
    },
    removeFromCart (productId) {
      cart.splice(cart.indexOf(cart.findIndex(product => product.id === productId)), 1);
    },
    cart,
    total
  }
}