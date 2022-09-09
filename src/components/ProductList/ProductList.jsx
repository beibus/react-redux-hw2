import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List, Spin } from 'antd';
import {fetchProducts} from './../../store/actions'
import { CreateProduct } from '../ProductForm/CreateProduct';

export const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products).sort((a, b) => b.id - a.id)
  const productsLoading = useSelector((store) => store.productsLoading)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  // console.log('products', products)
  
  return (
    <div>
      <CreateProduct />
      <h1>Products</h1>
      <List
        loading={productsLoading}
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={<div>{item.price}</div>}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
