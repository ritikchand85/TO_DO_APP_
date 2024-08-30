import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/app.scss";
import { createContext } from "react";

export const server="https://nodejs-todoapp.onrender.com/api/v1";
export const context= createContext({ isAuthenticated:false });

const AppWrapper=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [loading,setLoading]=useState(false);
  const [user,setUser]=useState({});

  return (
    <context.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      loading,
      setLoading,
      user,
      setUser,
    }}>
      <App />
    </context.Provider>
  );
  
};

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

