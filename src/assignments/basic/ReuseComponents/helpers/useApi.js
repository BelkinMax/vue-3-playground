import axios from 'axios'

/**
 * @returns {{ fetchProducts: () => Promise<{
 *    id: number,
 *    title: string,
 *    price: number,
 *    description: string,
 *    category: string,
 *    image: string
 *  }[]> }} - Returns a promise of an array of product objects.
 */
export function useApi() {
  const fetchProducts = async (qty = 4) => {
    let response = null

    try {
      response = await axios.get('https://fakestoreapi.com/products', {
        params: {
          limit: qty
        }
      })
    } catch (e) {
      console.error(e)
    }

    return response?.data || []
  }

  return {
    fetchProducts
  }
}
