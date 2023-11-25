import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../services/firebase.config";

import { collection, addDoc, getDocs } from "firebase/firestore";

import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button, Form, Input, Space, message } from "antd";
import TodoView from "./TodoView";
import { FetchPost, addTodo } from "./ApiHelpers";
import RecycleModal from "./RecycleModal";
import { MESSAGES } from "./data";

function Todo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isRecycleModalOpen, setIsRecycleModalOpen] = useState(false);
  const refr = useRef(null);
  var user = auth.currentUser;
  useEffect(() => {
    if (state?.token == null) {
      console.log("Please Sign in");
      navigate("/");
    } else {
      // console.log("Name here", user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, state]);

  const handleFetched = (data) => {
    setTodos(data);
  };
  const fetchData = () => {
    FetchPost({ getDocs, collection, db, handleFetched });
  };

  useEffect(() => {
    if (refr.current === null) {
      fetchData();
      refr.current = "tst";
    }
  }, [todos]);

  const addingTodo = (e) => {
    addTodo({ e, todoText, user, addDoc, collection, db, handleAdded });
  };
  const handleAdded = () => {
    setTodoText("");
    fetchData();
    message.success(MESSAGES.addSuccess)
  };
  return (
    <div>
      <Navbar userEmail={user?.email} />
      <Form
        name="Todo Form"
        className="todo-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Space.Compact style={{ width: "100%" }}>
          <Input
            type="text"
            placeholder="What do you have to do today?"
            onChange={(e) => setTodoText(e.target.value)}
            required
          />
          <Button type="primary" onClick={(e) => addingTodo(e)}>
            Submit
          </Button>
        </Space.Compact>
      </Form>
      <RecycleModal isRecycleModalOpen={isRecycleModalOpen} setIsRecycleModalOpen={setIsRecycleModalOpen} todos={todos} fetchData={fetchData}/>
      <TodoView fetchData={fetchData} todos={todos} />
    </div>
  );
}

export default Todo;
