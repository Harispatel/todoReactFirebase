import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../../services/firebase.config";
import { AUTO_FILL, PATH_NAMES } from "../../../components/data";


const Login = () => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    // Check Log and Navigate
    setTimeout(() => {
      if (auth?.currentUser?.accessToken !== undefined) {
        navigate(PATH_NAMES.TODO, {
          state: {
            token: auth?.currentUser?.accessToken,
          },
        });
      }
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const onFinish = async (values: any) => {
    // console.log("Success:", values);
    try {
      await signInWithEmailAndPassword(
        auth,
        values?.username,
        values?.password
      );
      if (auth?.currentUser?.accessToken !== undefined) {
        navigate(PATH_NAMES.TODO, {
          state: {
            token: auth?.currentUser?.accessToken,
          },
        });
      }
    } catch (error) {
      console.log("Error Occured", error);
      setNotice("Something Went Wrong.", error);
    }
  };

  const onFill = () => {
    form.setFieldsValue({
      username: AUTO_FILL.username,
      password: AUTO_FILL.password,
    });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="page-container">
    <h3>Login</h3>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          {"" !== notice && (
            <div className="alert alert-warning" role="alert">
              {notice}
            </div>
          )}
          </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="submit-btn" type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="dashed" htmlType="button" onClick={onFill}>
            Autofill
          </Button>
        </Form.Item>
        <span>
          Need to sign up for an account? <Link to={PATH_NAMES.SIGN_IN}>Click here.</Link>
        </span>
      </Form>
    </div>
  );
};

export default Login;
