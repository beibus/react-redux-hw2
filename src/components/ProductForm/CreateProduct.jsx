import React, {useState} from "react";
import { Button, Form, Input, Upload } from "antd";
import { createProduct, setModalState } from '../../store/actions';
import { useDispatch } from 'react-redux';

export const CreateProduct = () => {
  const dispatch = useDispatch();
  const [form] =Form.useForm()

  const onFinish = (values) => {
    console.log("Success:", values);

    dispatch(createProduct(values))

    setTimeout(() => {
      form.resetFields()  
    }, 0);

    dispatch(setModalState(false))
  };

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
          <Input />
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
