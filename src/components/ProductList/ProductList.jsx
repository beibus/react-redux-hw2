import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List, Modal,Button } from 'antd';
import {fetchProducts, setModalState, setEditProduct} from './../../store/actions'
import { CreateProduct } from '../ProductForm/CreateProduct';

export const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products).sort((a, b) => b.id - a.id)
  const productsLoading = useSelector((store) => store.productsLoading)
  const isModalOpen = useSelector((store) => store.isModalOpen)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  // console.log('products', products)
  
  const showModal = () => {
    dispatch(setModalState(true));
  };

  const closeModal = () => {
    dispatch(setModalState(false));
  }

  const handleEdit = (product) => {
    dispatch(setEditProduct(product))
    showModal()
  }

  return (
    <div>
      <Modal
        title="Form" 
        open={isModalOpen}
        onCancel={closeModal}
        footer={false}
      >
        <CreateProduct />
      </Modal>
      <h1>Products</h1>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
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
            <button onClick={() => handleEdit(item)}>Edit</button>
          </List.Item>
        )}
      />
    </div>
  )
}
