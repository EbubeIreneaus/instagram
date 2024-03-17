import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const apiurl = 'http://127.0.0.1:8000/api'

export const ApiContext = React.createContext('')

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Home />
  },
  {
    path:'/auth/login' ,
    element: <Login /> 
  },
  {
    path:'/auth/register' ,
    element: <Register /> 
  }
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApiContext.Provider value={apiurl}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
