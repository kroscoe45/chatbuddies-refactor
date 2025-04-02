import React, { useState } from 'react';
import { Button } from '@components/common/Button/Button';
import '@pages/Dashboard/Dashboard.css';
import '../views.css';

type Platform = {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive';
  apiKey: string;
};

const PlatformsView: React.FC = () => {
  const [platforms] = useState<Platform[]>([
    {
      id: '1',
      name: 'Facebook',
      url: 'https://facebook.com',
      status: 'active',
      apiKey: 'fb_api_123456'
    },
    {
      id: '2',
      name: 'Twitter',
      url: 'https://twitter.com',
      status: 'active',
      apiKey: 'tw_api_789012'
    },
    {
      id: '3',
      name: 'Instagram',
      url: 'https://instagram.com',
      status: 'inactive',
      apiKey: 'ig_api_345678'
    }
  ]);

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Platforms</h2>
        <Button variant="primary">Add Platform</Button>
      </div>

      <div className="platforms-list">
        {platforms.map(platform => (
          <div key={platform.id} className="platform-card">
            <div className="platform-header">
              <h3>{platform.name}</h3>
              <span className={`status-badge ${platform.status}`}>
                {platform.status}
              </span>
            </div>

            <div className="platform-details">
              <div className="detail-row">
                <span className="detail-label">URL:</span>
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                  {platform.url}
                </a>
              </div>
              <div className="detail-row">
                <span className="detail-label">API Key:</span>
                <span
                  className="api-key">{platform.apiKey.substring(0, 4)}...{platform.apiKey.substring(platform.apiKey.length - 4)}</span>
              </div>
            </div>

            <div className="platform-actions">
              <Button variant="secondary" size="small">Edit</Button>
              <Button variant="secondary" size="small">Reconnect</Button>
              <Button variant="danger" size="small">Disconnect</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PlatformsView };