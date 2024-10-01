import { Layout } from 'antd';
import Sidebar from './Sidebar';
import CustomHeader from './CustomHeader';
import UserPage from '../pages/UserPage';

const { Content, Sider, Header } = Layout;

const AppLayout = () => {
  return (
    <Layout>
      <Sider 
        theme="light" 
        trigger={null} 
        className="sider"
        style={{
          height: '100vh',
          position: 'sticky !important',
          left: 0,
          bottom: 0,
          top: 0,
        }}
        >
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{paddingTop: '12px', background: '#fff'}}>
          <CustomHeader />
        </Header>
        <Content style={{margin: '24px 16px', padding: '20px'}}>
          <UserPage />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
