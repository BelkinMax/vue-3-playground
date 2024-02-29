/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 */

import { ref } from 'vue'

const productCart = ref([]);
const total = ref(0);
export default function useShoppingCart() {
  function addToCart (product) {
    if (product) {
      productCart.value.push(product);
      setTotal();
    }
  }
  function removeFromCart (productId) {
    if (productId >= 0) {
      const productIdx = productCart.value.findIndex((product) =>
          product.id === productId
      );
      if (productIdx >= 0) {
        productCart.value.splice(productIdx, 1);
      }
      setTotal();
    }
  }
  function setTotal () {
    total.value = productCart.value.reduce((acumm, product) => {
      acumm += product.price;
      return acumm;
    }, 0);
  }

  return {
    addToCart,
    removeFromCart,
    productCart,
    total
  }
}
