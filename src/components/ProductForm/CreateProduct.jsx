import React, {useState, useEffect} from "react";
import { Button, Form, Input, Upload } from "antd";
import { createProduct, setModalState, setEditProduct, editProducts } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

export const CreateProduct = (props) => {
  const dispatch = useDispatch();
  const editProduct = useSelector((store) => store.editProduct)
  const [form] =Form.useForm()

  useEffect(() => {
    if (!editProduct) return
    form.setFieldsValue(editProduct)

  }, [form, editProduct])

  const onFinish = (values) => {
    console.log("Success:", values);

    if (editProduct) {
      dispatch(editProducts(values, editProduct.id))
      dispatch(setEditProduct(null))
    } else {
      dispatch(createProduct(values))
    }

    setTimeout(() => {
      form.resetFields()  
    }, 0);

    dispatch(setModalState(false))
  };

  console.log('editProduct', editProduct)
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Create Product</h1>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Product Name!",
            },
          ]}
        >
          <Input
           />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input Product Price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          valuePropName="file"
        >
          <Upload
            accept=".png, .jpg"
            listType='picture-card'
            beforeUpload={() => false}
            multiple={false}
            maxCount={1}
          >
            <Button>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {props.buttonTitle}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
