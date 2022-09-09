import axios from 'axios';
export const BASE_API_URL = 'http://178.62.221.120/api';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';


export const getProducts = () => ({
  type: FETCH_PRODUCTS
})

export const setProducts = (data) => ({
  type: RECEIVE_PRODUCTS,
  payload: data
})

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(getProducts());
    try {
      const response = await axios.get(`${BASE_API_URL}/products`);
      dispatch(setProducts(response.data))
    } catch (error) {
      console.error(error);
    }
  }
}

export const createProduct = (payload) => {
  return async (dispatch) => {

    let formData = new FormData()
    Object.keys(payload).forEach(key => {
      if (key === 'image') {
        formData.append(key, payload[key]?.file)  
      } else {
        formData.append(key, payload[key])  
      }
    });

    const data = payload.image ? formData : payload
    
    try {
      const response = await axios.post(`${BASE_API_URL}/products/create`, data);
      console.log('response', response)
      if (response.status === 201) {
        dispatch(fetchProducts())
      }
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }
}