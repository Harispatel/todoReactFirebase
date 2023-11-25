import { Button, Modal, Space } from "antd";
import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  SyncOutlined,
  RestOutlined,
  InteractionOutlined,
} from "@ant-design/icons";
import { auth, db } from "../services/firebase.config";
import { handleDelete, handleRecycle } from "./ApiHelpers";

function RecycleModal({
  isRecycleModalOpen,
  setIsRecycleModalOpen,
  todos,
  fetchData,
}) {
  var user = auth.currentUser;
  const [noRecords, setNoRecords] = useState(false);

  const handelingRecycle = async (data) => {
    handleRecycle({ data, doc, db, updateDoc, fetchData });
  };

  const handleOk = () => {
    setIsRecycleModalOpen(false);
  };
  const showModal = () => {
    setIsRecycleModalOpen(true);
  };
  const handlingDelete = async (data) => {
    handleDelete({ data, deleteDoc, doc, db, fetchData });
  };
  return (
    <>
      <Space direction="horizontal" size="middle" className="spacer">
        <Button icon={<SyncOutlined />} onClick={showModal}>
          Recycle Bin
        </Button>
      </Space>
      <Modal
        title="Restoring Bin"
        open={isRecycleModalOpen}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        // onOk={handleOk}
        onCancel={handleOk}
      >
        <table className="table" id="todo-table">
          <thead>
            <tr>
              {/* <th style={{ width: 100 }}>#</th> */}
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
                        {todoItem.isDeleted == true ? (
                          <tr key={key}>
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
                              <Button
                                type="dashed"
                                danger
                                onClick={() => handlingDelete(todoItem)}
                                style={{ marginRight: "10px" }}
                                title="Delete Permanently "
                              >
                                <RestOutlined />
                              </Button>

                              <Button
                                type="dashed"
                                danger
                                onClick={() => handelingRecycle(todoItem)}
                                style={{ marginRight: "10px" }}
                                title="Restore"
                              >
                                <InteractionOutlined />
                              </Button>
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
      </Modal>
    </>
  );
}
export default RecycleModal;
