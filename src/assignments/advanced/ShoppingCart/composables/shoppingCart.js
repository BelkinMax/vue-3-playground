/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 */
import { reactive, ref, watch } from 'vue'

const cart = reactive([]);
const total = ref(0);

export default function useShoppingCart () {
  watch(cart, (val) => {
    total.value = val.reduce((accum, cartItem) => {
      return cartItem.price + accum;
    }, 0);
  });

  function addToCart (product) {
    cart.push(product);
  }

  function removeFromCart (productId) {
    const idx = cart.find(product => product.id === productId);
    cart.splice(idx, 1);
  }
  return {
    cart,
    total,
    addToCart,
    removeFromCart
  }
}