import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List, Modal,Button } from 'antd';
import {fetchProducts} from './../../store/actions'
import { CreateProduct } from '../ProductForm/CreateProduct';

export const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products).sort((a, b) => b.id - a.id)
  const productsLoading = useSelector((store) => store.productsLoading)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  // console.log('products', products)
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <Modal
        title="Form" 
        open={isModalOpen}
        onCancel={closeModal}
        footer={false}
      >
        <CreateProduct close={closeModal} />
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
          </List.Item>
        )}
      />
    </div>
  )
}
