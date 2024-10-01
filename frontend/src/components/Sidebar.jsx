import { Flex, Menu } from 'antd';
import '../App.css';

const Sidebar = () => {
  return (
    <>
      <Flex align="center" justify="center">
      <div style={{ fontSize: '24px', margin: '20px 0' }}>
        PLUMS
      </div>
      </Flex>

      <Menu mode="inline" className="menu-bar" 
      items={[
        {
          key: '1',
          label: '메일링'
        }, 
        {
          key: '2',
          label: '패치데이터'
        },
        {
          key: '3',
          label: 'PatchLab 지원제품'
        }
      ]}
      />
    </>
  );
};

export default Sidebar;
