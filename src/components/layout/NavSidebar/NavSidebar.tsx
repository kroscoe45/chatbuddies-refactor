import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiUser, FiSettings, FiMessageSquare, FiInbox, FiDatabase } from 'react-icons/fi';
import './NavSidebar.css';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const NavSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems: NavItem[] = [
    {id: 'account', label: 'Account', icon: <FiUser/>, path: '/dashboard/account'},
    {id: 'settings', label: 'Settings', icon: <FiSettings/>, path: '/dashboard/settings'},
    {id: 'campaigns', label: 'Campaigns', icon: <FiMessageSquare/>, path: '/dashboard/campaigns'},
    {id: 'inbox', label: 'Inbox', icon: <FiInbox/>, path: '/dashboard/inbox'},
    {id: 'resources', label: 'Resources', icon: <FiDatabase/>, path: '/dashboard/resources'},
  ];

  const handleNavItemSelect = (path: string) => {
    navigate(path);
  };

  // Determine which item is selected based on current path
  const isItemSelected = (path: string): boolean => {
    return location.pathname.includes(path);
  };

  return (
    <div
      className={`nav-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${isItemSelected(item.path) ? 'selected' : ''}`}
          onClick={() => handleNavItemSelect(item.path)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export { NavSidebar };