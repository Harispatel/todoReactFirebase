import { Button, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { auth } from "../services/firebase.config";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PATH_NAMES } from "./data";

function Navbar({userEmail}) {
  const navigate = useNavigate();
  const handleSignout = () => {
    auth
      .signOut()
      .then(function () {
        // console.log("Signing Out ",accessToken)
        navigate(PATH_NAMES.LOGIN);
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  return (
    <Layout className="layout">
      <Header
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">TODO</Menu.Item>
        </Menu>
        <Menu theme="light" mode="horizontal">
          <span>{userEmail}</span>
        </Menu>
        <div>
          <Button
            type="primary"
            onClick={() => handleSignout()}
            style={{ marginRight: "10px" }}
          >
            <LogoutOutlined /> Logout
          </Button>
        </div>
      </Header>
    </Layout>
  );
}
export default Navbar;
