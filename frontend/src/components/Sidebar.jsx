import { Flex, Menu } from 'antd';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const items=[
    {key: '1', label: 'Dashboard'},
    {key: '2', label: '메일링'},
    {key: '3', label: '패치데이터'},
    {key: '4', label: 'PatchLab 지원제품'},
  ]

  const handleMenuClick = (key) => {
    // 메뉴 아이템 클릭 시 경로 설정
    switch (key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/');
        break;
      case '3':
        navigate('/');
        break;
      case '4':
        navigate('/');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Flex align="center" justify="center">
      <div style={{ fontSize: '24px', margin: '20px 0' }}>
        PLUMS
      </div>
      </Flex>

      <Menu mode="inline" className="menu-bar" defaultSelectedKeys={'1'}
        style={{marginTop: '30px'}}
        items={items}
        onClick={({ key }) => handleMenuClick(key)}
      />
    </>
  );
};

export default Sidebar;
