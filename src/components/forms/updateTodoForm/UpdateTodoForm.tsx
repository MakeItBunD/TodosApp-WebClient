import ITodo from '@/interfaces/ITodo';
import { todosAPI } from '@/redux/services/todos/todosService';
import {
  Button, Form, Input, Space,
} from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ICustomError } from '@/interfaces/ICustomError';
import styles from './UpdateTodoForm.module.css';

interface UpdateTodoFormProps {
  item: ITodo
  onClick: () => void
  onError: (error: ICustomError) => void
}

function UpdateTodoForm({ item, onClick, onError }: UpdateTodoFormProps) {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>(item.title);
  const [updateTodo, { error }] = todosAPI.useUpdateTodoMutation();

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const updateHandler = async () => {
    await updateTodo({ _id: item._id, title: value, isCompleted: item.isCompleted });
    onClick();
  };

  useEffect(() => {
    if (error) {
      onError(error as ICustomError);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Form
      layout="horizontal"
      form={form}
      className={styles.container}
    >
      <Form.Item label="New todo name" className={styles.input}>
        <Input placeholder="Todos name" value={value} onChange={changeInputHandler} maxLength={80} />
      </Form.Item>
      <Space direction="vertical">
        <Space wrap>
          <Form.Item>
            <Button disabled={!value} type="primary" htmlType="submit" onClick={updateHandler}>Update Todo</Button>
          </Form.Item>
          <Form.Item>
            <Button danger type="primary" htmlType="submit" onClick={() => onClick()}>Cancel</Button>
          </Form.Item>
        </Space>
      </Space>
    </Form>
  );
}

export default UpdateTodoForm;
