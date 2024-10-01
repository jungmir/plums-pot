import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserManagement from './components/UserManagement';
import UserDetail from './components/UserDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<UserManagement />} />
            <Route path="/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
