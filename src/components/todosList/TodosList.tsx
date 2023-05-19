import React, { useEffect, useState } from 'react';
import { List, Space, Spin } from 'antd';
import { todosAPI } from '@/redux/services/todos/todosService';
import ITodo from '@/interfaces/ITodo';
import { ICustomError } from '@/interfaces/ICustomError';
import getErrorMessage from '@/utils/getErrorMessage';
import styles from './TodoList.module.css';
import TodoItem from '../todoItem/TodoItem';
import ModalUI from '../UI/modal/ModalUI';

function Loader() {
  return (
    <div className={styles.loading}>
      <Space align="center">
        <Spin />
      </Space>
    </div>
  );
}

function TodosList() {
  const { data: todos, error, isLoading } = todosAPI.useGetTodosQuery(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setIsShowModal(true);
    }
  }, [error]);
  return (
    <>
      <ModalUI isModalOpen={isShowModal} title="An error has occurred" text={getErrorMessage(error as ICustomError)} handleOk={() => setIsShowModal(false)} handleCancel={() => setIsShowModal(false)} />
      <List
        className={styles.list}
        itemLayout="horizontal"
        dataSource={todos}
        locale={{ emptyText: 'No Todos' }}
        loading={{ indicator: <Loader />, spinning: isLoading }}
        renderItem={(item: ITodo) => (
          <TodoItem item={item} />
        )}
      />
    </>
  );
}

export default TodosList;
