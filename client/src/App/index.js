import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppStyles from 'component/AppStyles';
import Layout from 'component/Layout';
import Header from './component/Header';
import Login from './component/Login';
import Router from './Router';
import Context from './Context';

export default () => (
  <Context
    login={() => <Login />}
    router={() => (
      <BrowserRouter>
        <>
          <AppStyles />
          <Header />
          <Layout>
            <Router />
          </Layout>
        </>
      </BrowserRouter>
    )}
  />
);