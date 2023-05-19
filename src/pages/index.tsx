import React from 'react';
import dynamic from 'next/dynamic';
import LazyLoaderUI from '@/components/UI/lazyLoader/LazyLoaderUI';
import Head from 'next/head';

const CreateTodoForm = dynamic(() => import('../components/forms/createTodoForm/CreateTodoForm'), {
  ssr: false,
  loading: () => <LazyLoaderUI height={100} marginBottom={40} />,
});

const TodosList = dynamic(() => import('../components/todosList/TodosList'), {
  ssr: false,
  loading: () => (
    <div>
      <LazyLoaderUI height={50} marginBottom={20} />
      <LazyLoaderUI height={50} marginBottom={20} />
      <LazyLoaderUI height={50} marginBottom={20} />
      <LazyLoaderUI height={50} marginBottom={20} />
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <Head>
        <meta name="keywords" content="todos" />
        <title>Todos Page</title>
        <link rel="icon" type="image/svg" href="../../favicon.svg" />
      </Head>
      <div className="container">
        <CreateTodoForm />
        <TodosList />
      </div>
    </>
  );
}
