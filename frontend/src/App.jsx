// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AddUserPage from './pages/AddUserPage';
import EditUserPage from './pages/EditUserPage';
import AppLayout from './components/AppLayout';
import './App.css';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/edit-user/:id" element={<EditUserPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;