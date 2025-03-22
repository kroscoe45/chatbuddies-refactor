// src/pages/Dashboard/views/CampaignsView.tsx
import React, { useState } from 'react';
import '@pages/Dashboard/Dashboard.css';
import '../views.css';

type Campaign = {
  id: string;
  name: string;
  status: 'active' | 'scheduled' | 'completed';
  startDate: string;
  endDate?: string;
  stats: {
    sent: number;
    opened: number;
    clicked: number;
  };
};

const CampaignsView: React.FC = () => {
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Promotion',
      status: 'active',
      startDate: '2023-06-01',
      stats: {sent: 1250, opened: 620, clicked: 235}
    },
    {
      id: '2',
      name: 'New Product Launch',
      status: 'scheduled',
      startDate: '2023-07-15',
      stats: {sent: 0, opened: 0, clicked: 0}
    },
    {
      id: '3',
      name: 'Customer Survey',
      status: 'completed',
      startDate: '2023-04-10',
      endDate: '2023-04-20',
      stats: {sent: 850, opened: 640, clicked: 320}
    }
  ]);

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Campaigns</h2>
        <button className="btn-primary">Create Campaign</button>
      </div>

      <div className="campaign-list">
        <div className="campaign-table-header">
          <div className="campaign-cell">Name</div>
          <div className="campaign-cell">Status</div>
          <div className="campaign-cell">Start Date</div>
          <div className="campaign-cell">End Date</div>
          <div className="campaign-cell">Sent</div>
          <div className="campaign-cell">Opened</div>
          <div className="campaign-cell">Clicked</div>
          <div className="campaign-cell">Actions</div>
        </div>

        {campaigns.map(campaign => (
          <div key={campaign.id} className="campaign-row">
            <div className="campaign-cell">{campaign.name}</div>
            <div className="campaign-cell">
              <span className={`status-pill status-${campaign.status}`}>
                {campaign.status}
              </span>
            </div>
            <div className="campaign-cell">{campaign.startDate}</div>
            <div className="campaign-cell">{campaign.endDate || '-'}</div>
            <div className="campaign-cell">{campaign.stats.sent}</div>
            <div className="campaign-cell">{campaign.stats.opened}</div>
            <div className="campaign-cell">{campaign.stats.clicked}</div>
            <div className="campaign-cell">
              <button className="action-button">Edit</button>
              <button className="action-button">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CampaignsView };
