import { 
  FETCH_PRODUCTS, 
  RECEIVE_PRODUCTS,
  SET_MODAL_STATE
} from './actions';

const initialState = {
  products: [],
  productsLoading: false,
  isModalOpen: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_STATE: 
      return {
        ...state,
        isModalOpen: action.isOpen,
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