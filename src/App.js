import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import PrivateRoutes from './utils/PrivateRoutes'
import LoginPage from './pages/LoginPage'
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
          <Route element={<LoginPage/>} path="/"/>
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
