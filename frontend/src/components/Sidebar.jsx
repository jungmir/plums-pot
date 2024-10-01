import React from 'react';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="site-name">Plums</div>
      <ul>
        <li><a href="#" className="active">Dashboard</a></li>
        <li><a href="#">회원 조회</a></li>
        <li><a href="#">패치 데이터</a></li>
        <li><a href="#">제품 등록</a></li>
      </ul>
    </nav>
  );
}

export default Sidebar;