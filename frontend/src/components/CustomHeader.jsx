// // src/components/Header.jsx
// import { Layout, Menu } from 'antd';
// import { Link, useLocation } from 'react-router-dom';

// const { Header: AntHeader } = Layout;

// const Header = () => {
//   const location = useLocation();
//   const selectedKey = location.pathname;

//   return (
//     <AntHeader style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
//       <div className="logo" />
//       <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
//         <Menu.Item key="/">
//           <Link to="/">홈</Link>
//         </Menu.Item>
//         <Menu.Item key="/add-user">
//           <Link to="/add-user">사용자 추가</Link>
//         </Menu.Item>
//       </Menu>
//     </AntHeader>
//   );
// };

// export default Header;
import { Button } from 'antd';
import { Link } from 'react-router-dom';


const CustomHeader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div></div>
      <Button type="default">
        <Link to="/" style={{  }}>
          로그인
        </Link>
      </Button>
    </div>
  );
};

export default CustomHeader;
