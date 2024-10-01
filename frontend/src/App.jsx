// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import AddUserPage from './pages/AddUserPage';
import EditUserPage from './pages/EditUserPage';
import AppLayout from './components/AppLayout';
import './App.css';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/edit/:id" element={<EditUserPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;