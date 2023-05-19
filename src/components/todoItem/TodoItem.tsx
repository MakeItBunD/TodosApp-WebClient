import React, { useState } from 'react';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import {
  List, Button, Tooltip, Space, Checkbox,
} from 'antd';
import ITodo from '@/interfaces/ITodo';
import { todosAPI } from '@/redux/services/todos/todosService';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import styles from './TodoItem.module.css';
import ModalUI from '../UI/modal/ModalUI';
import UpdateTodoForm from '../forms/updateTodoForm/UpdateTodoForm';

interface TodoItemProps {
  item: ITodo
}

function TodosItem({ item }: TodoItemProps) {
  const [isShowInput, setIsShowInput] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [updateTodo] = todosAPI.useUpdateTodoMutation();
  const [deleteTodo] = todosAPI.useDeleteTodoMutation();

  const updateHandler = async (event: CheckboxChangeEvent) => {
    await updateTodo({ _id: item._id, title: item.title, isCompleted: event.target.checked });
  };

  const deleteHandler = async () => {
    await deleteTodo({ _id: item._id });
    setIsShowModal(false);
  };

  return (
    <>
      <ModalUI isModalOpen={isShowModal} title="Confirm action" text="Are you sure you want to delete this todo?" handleOk={() => deleteHandler()} handleCancel={() => setIsShowModal(false)} />
      <ModalUI isModalOpen={!!errorMessage} title="Confirm action" text={errorMessage} handleOk={() => setErrorMessage('')} handleCancel={() => setErrorMessage('')} />
      <List.Item id={item._id}>
        {isShowInput
          ? (
            <UpdateTodoForm
              item={item}
              onClick={() => setIsShowInput(false)}
              onError={(error) => setErrorMessage(error.data.message)}
            />
          )
          : (
            <div className={styles.todoContainer}>
              <Checkbox
                onChange={updateHandler}
                checked={item.isCompleted}
              />
              <List.Item.Meta className={styles.title} title={item.title} />
              <Space direction="vertical">
                <Space wrap>
                  <Tooltip title="edit">
                    <Button type="primary" onClick={() => setIsShowInput(true)} shape="circle" icon={<EditOutlined />} />
                  </Tooltip>
                  <Tooltip title="delete">
                    <Button type="primary" onClick={() => setIsShowModal(true)} danger shape="circle" icon={<CloseOutlined />} />
                  </Tooltip>
                </Space>
              </Space>
            </div>
          )}
      </List.Item>
    </>

  );
}

export default TodosItem;
