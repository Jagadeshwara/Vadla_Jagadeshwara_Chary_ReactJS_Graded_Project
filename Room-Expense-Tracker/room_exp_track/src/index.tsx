import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BodyComponent from './components/BodyComponent';
import NewRowForm from './components/AddingNewRowForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
          {// index ==> '/home'
          }
        <Route index element={<App/> }></Route>
        <Route path='/home' element={<BodyComponent/>}></Route>
        <Route path="/add" element={<NewRowForm />}></Route>
      </Routes>
    </BrowserRouter> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
