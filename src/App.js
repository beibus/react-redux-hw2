import logo from './logo.svg';
import './App.css';
import { ProductList } from './components/ProductList/ProductList';
import { useEffect, useState } from "react";
import {fetchProducts} from "./store/actions"
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const myInterval = setInterval(() => {
      dispatch(fetchProducts())
    }, 5000);
  }, []);
  return (
    <div className="App">
      <ProductList />
    </div>
  );
}

export default App;
