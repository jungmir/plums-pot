import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  FileTextOutlined,
  PictureOutlined,
  FileOutlined,
  CommentOutlined,
  SkinOutlined,
  ToolOutlined,
  AppstoreOutlined,
  AntDesignOutlined
} from '@ant-design/icons';
import UserList from './components/UserList';
import UserAdd from './components/UserAdd';
import UserEdit from './components/UserEdit';
import './App.css';

const { Header, Content, Sider } = Layout;

//사용자 프로필 드롭다운 메뉴 설정
const profileMenu = (
  <Menu>
    <Menu.Item key="1">My Profile</Menu.Item>
    <Menu.Item key="2">Settings</Menu.Item>
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
);

//mock service worker 활성화
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') return;

  const { worker } = await import('./mock/browser');
  return worker.start();
}

//msw 활성화
enableMocking().then(() => {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('Failed to find the root element');
  }
});

//메인 컴포넌트
function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileTextOutlined />}>
              <Link to="/posts">Posts</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<PictureOutlined />}>
              <Link to="/media">Media</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<FileOutlined />}>
              <Link to="/pages">Pages</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<CommentOutlined />}>
              <Link to="/comments">Comments</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<SkinOutlined />}>
              <Link to="/appearance">Appearance</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<ToolOutlined />}>
              <Link to="/plugins">Plugins</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<AppstoreOutlined />}>
              <Link to="/tools">Tools</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<SettingOutlined />}>
              <Link to="/settings">Settings</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ padding: 0, background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
              <AntDesignOutlined style={{ fontSize: '40px', color: '#1890ff', marginRight: '10px' }} />
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Plums</span>
            </div>

            <Dropdown overlay={profileMenu} placement="bottomRight">
              <Space style={{ marginRight: '20px', cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>Giacomo</span>
              </Space>
            </Dropdown>
          </Header>

          <Content style={{ padding: '20px 50px', marginTop: 64, flex: '1 1 auto' }}>
            <Routes>
              <Route path="/users" element={<UserList />} />
              <Route path="/add" element={<UserAdd />} />
              <Route path="/edit/:id" element={<UserEdit />} />
              <Route path="/" element={<div>Dashboard Section</div>} />
              <Route path="/posts" element={<div>Posts Section</div>} />
              <Route path="/media" element={<div>Media Section</div>} />
              <Route path="/pages" element={<div>Pages Section</div>} />
              <Route path="/comments" element={<div>Comments Section</div>} />
              <Route path="/appearance" element={<div>Appearance Section</div>} />
              <Route path="/plugins" element={<div>Plugins Section</div>} />
              <Route path="/tools" element={<div>Tools Section</div>} />
              <Route path="/settings" element={<div>Settings Section</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;