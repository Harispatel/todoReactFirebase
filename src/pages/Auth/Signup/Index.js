import React from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase.config";
import { Button, Form, Input, message } from "antd";
import { PATH_NAMES } from "../../../components/data";

function Index() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      await createUserWithEmailAndPassword(
        auth,
        values?.email,
        values?.password
      );
      console.log("Navigate to Login now");
      navigate(PATH_NAMES.TODO);
    } catch (err) {
      message.error("Sorry, something went wrong. Please try again.", err);
    }
  };

  const [form] = Form.useForm();
  return (
    <div className="page-container">
      <h3>Sign Up</h3>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Index;
