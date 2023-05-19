import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { todosAPI } from '@/redux/services/todos/todosService';
import ModalUI from '@/components/UI/modal/ModalUI';
import getErrorMessage from '@/utils/getErrorMessage';
import { ICustomError } from '@/interfaces/ICustomError';

function CreateTodoForm() {
  const [value, setValue] = useState<string>('');
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [addTodo, { error }] = todosAPI.useAddTodoMutation();

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const addTodoHandler = async () => {
    await addTodo({ title: value });
    setValue('');
  };

  useEffect(() => {
    if (error) {
      setIsShowModal(true);
    }
  }, [error]);

  return (
    <Form
      layout="vertical"
      form={form}
    >
      <ModalUI isModalOpen={isShowModal} title="An error has occurred" text={getErrorMessage(error as ICustomError)} handleCancel={() => setIsShowModal(false)} handleOk={() => setIsShowModal(false)} />
      <Form.Item label="Todo name">
        <Input placeholder="Todo name" value={value} onChange={changeInputHandler} maxLength={80} />
      </Form.Item>
      <Form.Item>
        <Button disabled={!value} type="primary" htmlType="submit" onClick={addTodoHandler}>Create todo</Button>
      </Form.Item>
    </Form>
  );
}

export default CreateTodoForm;
