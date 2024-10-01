import React, { useState } from 'react';

function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(user || { name: '', email: '', isActive: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="이름"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="이메일"
        required
      />
      <label>
        <input
          name="isActive"
          type="checkbox"
          checked={formData.isActive}
          onChange={handleChange}
        />
        활성 상태
      </label>
      <button type="submit">저장</button>
      <button type="button" onClick={onCancel}>취소</button>
    </form>
  );
}

export default UserForm;
