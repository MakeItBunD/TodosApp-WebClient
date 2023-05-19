import React from 'react';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { setupStore } from '@/redux/store';
import { Provider } from 'react-redux';

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
