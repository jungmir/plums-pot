import React from 'react';

function Header() {
    return (
      <header className="app-header">
        <h1>회원 조회</h1>
        <div className="admin-info">
          Hello, admin <span className="admin-avatar">👤</span>
        </div>
      </header>
    );
  }

export default Header;
