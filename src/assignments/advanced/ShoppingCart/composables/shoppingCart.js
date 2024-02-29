/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 */
import {reactive, ref} from "vue";

export default function useShoppingCart() {

  const total = ref(0)
  const cart = reactive([]);

  const addToCart = product => {
    console.log(product)
    cart.push(product)
    total.value += product.price;
  };

  const removeFromCart = (productId) => {
    const indexToDrop = cart.findIndex(item => productId === item.id)
    const productPrice = cart[indexToDrop].price;
    cart.splice(indexToDrop, 1);
    total.value -= productPrice;
  }

  return {
    addToCart,
    removeFromCart,
    cart,
    total
  }
}