/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 */
import {reactive, ref} from 'vue'

const cart = reactive([]);
const total = ref(0);

export default function useShoppingCart() {

  const addToCart = (product) => {
    cart.push(product);
    total.value += product.price;
  }

  const removeFromCart = (productId) => {
    const index = cart.findIndex(({ id }) => id === productId);
    if (index !== -1) {
      const removedProduct = cart.splice(index, 1)[0];
      total.value -= removedProduct.price;
    }
  }

  return {
    cart,
    total,
    addToCart,
    removeFromCart
  }
}