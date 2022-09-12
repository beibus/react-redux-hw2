import { 
  FETCH_PRODUCTS, 
  RECEIVE_PRODUCTS,
  SET_MODAL_STATE,
  SET_PRODUCT,
} from './actions';

const initialState = {
  products: [],
  productsLoading: false,
  isModalOpen: false,
  editProduct: null,
  isModalCreate: true
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_STATE: 
      return {
        ...state,
        isModalOpen: action.isOpen,
      }

    case SET_PRODUCT: 
      return {
        ...state,
        editProduct: action.payload,
      }

    case FETCH_PRODUCTS: 
      return {
        ...state,
        productsLoading: true
      }
    case RECEIVE_PRODUCTS: 
      return {
        ...state,
        productsLoading: false,
        products: action.payload
      }
    
    
    default:
      return state;
  }
}