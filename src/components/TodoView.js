import React from "react";
import { Button, Checkbox, Popconfirm, message } from "antd";
import { RestOutlined, InteractionOutlined } from "@ant-design/icons";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase.config";
import { handleChange,  handleRecycle } from "./ApiHelpers";
import { DB_NAME, MESSAGES } from "./data";

function TodoView({ fetchData, todos }) {
  var user = auth.currentUser;

  const handelingRecycle = async (data) => {
    handleRecycle({ data, doc, db, updateDoc, fetchData });
  };
  const confirmDelete = async (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    try {
      // const userRef = doc(db, DB_NAME, data?.id);
      await deleteDoc(doc(db, DB_NAME, e?.id));
      if (e?.id) {
        fetchData();
      }
      console.log(e?.id);
      message.success(MESSAGES.delSuccess);
    } catch (err) {
      console.log(err);
      message.error(MESSAGES.delError);
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.info(MESSAGES.delCancel);
  };
  const handleTaskUpdate=()=>{
    fetchData()
    message.info(MESSAGES.updSuccess);
  }
  const handlingChange = async (e, data) => {
    handleChange({ e, data, doc, db, updateDoc, handleTaskUpdate });
  };
  return (
    <div className="todo-container">
      <table className="table" id="todo-table">
        <thead>
          <tr>
            <th style={{ width: 100 }}>#</th>
            <th className="todo-item">TODO Details</th>
            <th className="todo-item">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos?.length > 0 ? (
            todos?.map((todoItem, key) => {
              return (
                <>
                  {todoItem?.userId === user.email ? (
                    <>
                      {todoItem.isDeleted == false ? (
                        <tr key={key}>
                          <td>
                            <Checkbox
                              defaultChecked={
                                todoItem.isCompleted == true ? true : false
                              }
                              onChange={(e) => handlingChange(e, todoItem)}
                            ></Checkbox>
                          </td>
                          <td className="todo-item">
                            <span
                              className={
                                todoItem?.isCompleted == true
                                  ? "todo-done"
                                  : undefined
                              }
                            >
                              {todoItem?.todo}
                            </span>
                          </td>
                          <td>
                            <Popconfirm
                              title="Delete the task"
                              description="Are you sure to delete permanently?"
                              onConfirm={() => confirmDelete(todoItem)}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button danger style={{ marginRight: "10px" }}>
                                <RestOutlined />
                              </Button>
                            </Popconfirm>

                            <Popconfirm
                              title="Recycling"
                              description="Are you sure to want to add task to recycle bin?"
                              onConfirm={() => handelingRecycle(todoItem)}
                              onOpenChange={() => console.log("open change")}
                            >
                              <Button type="primary">
                              <InteractionOutlined /> 
                              </Button>
                            </Popconfirm>
                          </td>
                        </tr>
                      ) : null}
                    </>
                  ) : null}
                </>
              );
            })
          ) : (
            <tr>No Records Found</tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodoView;
