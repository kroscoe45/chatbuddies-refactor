import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavSidebar.css';

export interface NavItem {
  id: string;
  label: string;
  path: string;
}

interface NavSidebarProps {
  items: NavItem[];
  className?: string;
}

export const NavSidebar: React.FC<NavSidebarProps> = ({items, className = ''}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavItemSelect = (path: string) => {
    navigate(path);
  };

  // determine which item is selected based on current path (for styling)
  const isItemSelected = (path: string): boolean => {
    return location.pathname.includes(path);
  };

  return (
    <div className={`nav-sidebar ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${isItemSelected(item.path) ? 'selected' : ''}`}
          onClick={() => handleNavItemSelect(item.path)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};