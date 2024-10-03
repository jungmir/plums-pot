import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserManagement from './components/UserManagement';
import UserDetail from './components/UserDetail';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
              <Routes>
                <Route path="/" element={<UserManagement />} />
                <Route path="/:id" element={<UserDetail />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
