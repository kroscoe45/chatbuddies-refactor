// src/pages/Dashboard/Dashboard.tsx
import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { NavSidebar } from '@components/layout/NavSidebar';
import { AccountView } from './Views/AccountView';
import { SettingsView } from './Views/SettingsView';
import { CampaignsView } from './Views/CampaignsView';
import { InboxView } from './Views/InboxView';
import { ResourcesView } from './Views/ResourcesView';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <NavSidebar/>

      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/account" replace/>}/>
          <Route path="/account" element={<AccountView/>}/>
          <Route path="/settings" element={<SettingsView/>}/>
          <Route path="/campaigns" element={<CampaignsView/>}/>
          <Route path="/inbox" element={<InboxView/>}/>
          <Route path="/resources" element={<ResourcesView/>}/>
          <Route path="*" element={<Navigate to="/dashboard/account" replace/>}/>
        </Routes>
      </div>
    </div>
  );
};

export { Dashboard };