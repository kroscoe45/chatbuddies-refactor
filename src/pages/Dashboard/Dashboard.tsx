// src/pages/Dashboard/Dashboard.tsx
import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { NavSidebar, NavItem } from '@components/layout/NavSidebar/NavSidebar';
import {
  AccountView,
  CampaignsView,
  InboxView,
  ResourcesView,
  PlatformsView,
  PlatformConfigurationsView
} from '@pages/Dashboard/Views';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navItems: NavItem[] = [
    {id: 'inbox', label: 'Inbox', path: '/dashboard/inbox'},
    {id: 'platforms', label: 'Platforms', path: '/dashboard/platforms'},
    {id: 'resources', label: 'Resources', path: '/dashboard/resources'},
    {id: 'campaigns', label: 'Campaigns', path: '/dashboard/campaigns'},
    {id: 'configurations', label: 'Platform Configurations', path: '/dashboard/configurations'},
    {id: 'account', label: 'Account', path: '/dashboard/account'},
  ];

  return (
    <div className="dashboard-container">
      <NavSidebar items={navItems}/>
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/inbox" replace/>}/>
          <Route path="/account" element={<AccountView/>}/>
          <Route path="/configurations" element={<PlatformConfigurationsView/>}/>
          <Route path="/campaigns" element={<CampaignsView/>}/>
          <Route path="/inbox" element={<InboxView/>}/>
          <Route path="/resources" element={<ResourcesView/>}/>
          <Route path="/platforms" element={<PlatformsView/>}/>
          <Route path="*" element={<Navigate to="/dashboard/inbox" replace/>}/>
        </Routes>
      </div>
    </div>
  );
};

export { Dashboard };