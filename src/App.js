import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MenuBar from './Components/MenuBar';
import Home from './Components/Home';
import Orders from './Components/Orders';
import Products from './Components/Products';

function App() {
  return (
    <Router>
      <MenuBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
