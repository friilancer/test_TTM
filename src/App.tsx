import Account from "./Account";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import React, { useState, createContext, useContext } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

interface UserStateContextType {
  email: string,
  token: string
}

const UserStateContext = createContext<any|null>(null)

const UserDispatchContext = createContext<any|null>(null)

const savedToken: string | null = localStorage.getItem('testToken')
const savedEmail: string | null = localStorage.getItem('testEmail')

export const App = () => {
  const [user, setUser] = useState({
    email: savedEmail || '',
    token: savedToken || '',
  })

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        <BrowserRouter>
            <Routes>
              <Route path="/home" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
              }/>
              <Route path="/login" element={<Login />} />
              <Route path="*"  element={<Register />} />
              <Route path="/account"  element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
            </Routes>
        </BrowserRouter>
        </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export const useUserAuthStateContext = () => {

  const context = useContext(UserStateContext);

  if (context === undefined) {
    throw new Error('UseUserAuthStateContext must be used within a provider');
  }

  return context

}

export const useUserAuthDispatchContext = () => {

  const context = useContext(UserDispatchContext);

  if (context === undefined) {
    throw new Error('UseUserAuthDispatchContext must be used within a provider')
  }

  return context;

}
