import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List, Modal, Button, Form } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchProducts, setModalState, setEditProduct, deleteProduct } from './../../store/actions'
import { CreateProduct } from '../ProductForm/CreateProduct';
import './ProductList.css'


export const ProductList = () => {
  console.log('start');
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products).sort((a, b) => b.id - a.id)
  const productsLoading = useSelector((store) => store.productsLoading)
  const isModalOpen = useSelector((store) => store.isModalOpen)
  const editProduct = useSelector((store) => store.editProduct)
  const [form] = Form.useForm()

  useEffect(() => {
    console.log('useEffect');
    dispatch(fetchProducts())
  }, [])

  const showModal = () => {
    dispatch(setModalState(true));
  };

  const closeModal = () => {
    dispatch(setModalState(false));
    dispatch(setEditProduct(null))
    form.resetFields()
  }

  const handleEdit = (values) => {
    dispatch(setEditProduct(values))
    showModal()

  }

  const deleteItem = (values) => {
    dispatch(deleteProduct(values))
  }


  const title = editProduct ? 'Update' : 'Create'
  const modalTitle = editProduct ? 'Update Product' : 'Create Product'

  return (
    <div className='list-container'>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onCancel={closeModal}
        footer={false}
      >
        <CreateProduct buttonTitle={title} />
      </Modal>
      <div className='list-header'>
        <h1>Products</h1>
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>

      </div>
      <div className='list-body'>
        <List
          loading={productsLoading}
          itemLayout="horizontal"
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={<div>{item.name}</div>}
                price={<div>{item.price}</div>}
              /><DeleteOutlined
                onClick={() => { deleteItem(item.id) }}
              />
              <EditOutlined onClick={() => handleEdit(item)} />
            </List.Item>
          )}
        />

      </div>
    </div>
  )
}
