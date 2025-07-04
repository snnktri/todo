import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';

import Signup from './pages/Signup';
import Login from './pages/Login';
import TodoForm from './pages/TodoForm';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todoform" element={<TodoForm />} />
      </Route>
    )
  )
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
