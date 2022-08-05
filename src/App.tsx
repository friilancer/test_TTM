import Account from "./Account";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import React, { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const UserStateContext = React.createContext({})
const UserDispatchContext = React.createContext(undefined)

function App() {
  const [user, setUser] = useState({
    email: '',
    token: '',
    timeout: 0
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/account"  element={<Account />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
