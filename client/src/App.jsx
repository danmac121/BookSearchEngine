import React from 'react';
import './App.css';
import { ApolloProvider, ApolloClient } from '@apollo/client';


import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
