import { reactive, computed } from 'vue'

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 */

export default function useCart() {
  const state = reactive({
    cart: []
  });

  const total = computed(() => {
    return state.cart.reduce((sum, product) => sum + product.price, 0);
  });

  const addToCart = (product) => {
    state.cart.push(product);
  };

  const removeFromCart = (productId) => {
    const index = state.cart.findIndex(p => p.id === productId);
    if (index !== -1) {
      state.cart.splice(index, 1);
    }
  };

  return {
    cart: state.cart,
    total,
    addToCart,
    removeFromCart
  };
}