import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const SERVER_URL = 'http://localhost:8080';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const todosAPI = createApi({
  reducerPath: 'todosAPI',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ['todo'],
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => ({
        url: '/todos',
        headers,
      }),
      providesTags: () => ['todo'],
    }),
    addTodo: build.mutation({
      query: (body: { title: string }) => ({
        method: 'POST',
        url: '/todos',
        body,
        headers,
      }),
      invalidatesTags: ['todo'],
    }),
    updateTodo: build.mutation({
      query: (body: { _id: string, title: string, isCompleted: boolean }) => ({
        method: 'PUT',
        url: `/todos/${body._id}`,
        body,
        headers,
      }),
      invalidatesTags: ['todo'],
    }),
    deleteTodo: build.mutation({
      query: (body: { _id: string }) => ({
        method: 'DELETE',
        url: `/todos/${body._id}`,
        headers,
      }),
      invalidatesTags: ['todo'],
    }),
  }),
});

export const {
  useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation,
} = todosAPI;
