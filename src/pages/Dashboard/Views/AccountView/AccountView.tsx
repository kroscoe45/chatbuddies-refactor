// src/pages/Dashboard/Views/AccountView/AccountView.tsx
import React, { useState } from 'react';
import { TextInput } from '@components/common/Input/TextInput';
import '@pages/Dashboard/Dashboard.css';
import '../views.css';

const AccountView: React.FC = () => {
  // Personal info state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  });

  // Password state
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle personal info changes
  const handlePersonalInfoChange = (name: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password changes
  const handlePasswordChange = (name: string, value: string) => {
    setPasswordInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save personal info
  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving personal info:', personalInfo);
    // API call would go here
  };

  // Update password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Updating password');
    // API call would go here
  };

  // Validation functions
  const validateRequired = (value: string) => value ? null : 'This field is required';
  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value) ? null : 'Invalid email format';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return null;
  };

  return (
    <div className="view-container">
      <h2>Account Information</h2>

      <div className="account-section">
        <h3>Personal Information</h3>
        <form onSubmit={handleSavePersonalInfo}>
          <TextInput
            name="firstName"
            label="First Name"
            value={personalInfo.firstName}
            onChange={handlePersonalInfoChange}
            validation={validateRequired}
          />

          <TextInput
            name="lastName"
            label="Last Name"
            value={personalInfo.lastName}
            onChange={handlePersonalInfoChange}
            validation={validateRequired}
          />

          <TextInput
            name="email"
            label="Email"
            value={personalInfo.email}
            onChange={handlePersonalInfoChange}
            validation={validateEmail}
            type="email"
          />

          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      </div>

      <div className="account-section">
        <h3>Password</h3>
        <form onSubmit={handleUpdatePassword}>
          <TextInput
            name="currentPassword"
            label="Current Password"
            value={passwordInfo.currentPassword}
            onChange={handlePasswordChange}
            validation={validateRequired}
            type="password"
          />

          <TextInput
            name="newPassword"
            label="New Password"
            value={passwordInfo.newPassword}
            onChange={handlePasswordChange}
            validation={validatePassword}
            type="password"
          />

          <TextInput
            name="confirmPassword"
            label="Confirm New Password"
            value={passwordInfo.confirmPassword}
            onChange={handlePasswordChange}
            validation={validateRequired}
            type="password"
          />

          <button type="submit" className="btn-primary">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export { AccountView };