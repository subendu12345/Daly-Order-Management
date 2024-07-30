import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MenuBar from './Components/MenuBar';
import Home from './Components/Home';
import Orders from './Components/Orders';
import Products from './Components/Products';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';


const App= ()=> {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <MenuBar/>
      <Routes>
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route
          path="/products"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
