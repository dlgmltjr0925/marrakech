import '../styles/reset.css';
import '../styles/globals.css';

import {
  Middleware,
  Store,
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useMemo } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist/es/types';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import persistStore from 'redux-persist/lib/persistStore';
import reducers from '../reducers';
import usePlayer from '../hooks/usePlayer';
import { useStore } from 'react-redux';

interface PersistorStore extends Store {
  __persistor?: Persistor;
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore() as Store & { __persistor: Persistor };

  return (
    <>
      <Head>
        <title>Welcome marrakech - Sell your carpets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PersistGate persistor={store.__persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </PersistGate>
    </>
  );
}

const configureStore = (initialState: any) => {
  const isServer = typeof window === 'undefined';
  const middlewares: Middleware<any, any, any>[] = [];
  if (isServer) {
    return createStore(reducers, undefined, applyMiddleware(...middlewares));
  } else {
    const enhancer =
      process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares));

    const store = createStore(
      reducers,
      initialState,
      enhancer
    ) as PersistorStore;

    store.__persistor = persistStore(store);

    return store;
  }
};

const wrapper = createWrapper(configureStore);

export default wrapper.withRedux(MyApp);
