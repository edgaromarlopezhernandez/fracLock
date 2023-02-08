import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
          <Route element={<Login/>} path="/"/>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/home" exact/>
                <Route element={<Products/>} path="/products"/>
            </Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
