// src/pages/Dashboard/views/SettingsView.tsx
import React, { useState } from 'react';
import '@pages/Dashboard/Dashboard.css';
import '../views.css';

// Example settings options
type SettingGroup = {
  id: string;
  label: string;
};

type Setting = {
  id: string;
  label: string;
  description: string;
  component: React.ReactNode;
};

const SettingsView: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>('general');

  const settingGroups: SettingGroup[] = [
    {id: 'general', label: 'General Settings'},
    {id: 'notifications', label: 'Notifications'},
    {id: 'appearance', label: 'Appearance'},
    {id: 'privacy', label: 'Privacy & Security'}
  ];

  const settings: Record<string, Setting[]> = {
    'general': [
      {
        id: 'language',
        label: 'Language',
        description: 'Select your preferred language',
        component: (
          <select defaultValue="en">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        )
      },
      {
        id: 'timezone',
        label: 'Time Zone',
        description: 'Set your local time zone',
        component: (
          <select defaultValue="UTC">
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="CST">Central Time</option>
            <option value="PST">Pacific Time</option>
          </select>
        )
      }
    ],
    'notifications': [
      {
        id: 'email_notifications',
        label: 'Email Notifications',
        description: 'Receive notifications via email',
        component: (
          <div className="toggle-switch">
            <input type="checkbox" id="email_toggle" defaultChecked/>
            <label htmlFor="email_toggle">Enable</label>
          </div>
        )
      },
      {
        id: 'message_notifications',
        label: 'Message Notifications',
        description: 'Get notified about new messages',
        component: (
          <div className="toggle-switch">
            <input type="checkbox" id="message_toggle" defaultChecked/>
            <label htmlFor="message_toggle">Enable</label>
          </div>
        )
      }
    ],
    'appearance': [
      {
        id: 'theme',
        label: 'Theme',
        description: 'Choose light or dark theme',
        component: (
          <div className="radio-group">
            <label>
              <input type="radio" name="theme" value="light" defaultChecked/> Light
            </label>
            <label>
              <input type="radio" name="theme" value="dark"/> Dark
            </label>
          </div>
        )
      }
    ],
    'privacy': [
      {
        id: 'tracking',
        label: 'Usage Tracking',
        description: 'Allow anonymous usage data collection to improve our service',
        component: (
          <div className="toggle-switch">
            <input type="checkbox" id="tracking_toggle" defaultChecked/>
            <label htmlFor="tracking_toggle">Enable</label>
          </div>
        )
      }
    ]
  };

  return (
    <div className="view-container">
      <h2>Settings</h2>

      <div className="settings-layout">
        <div className="settings-sidebar">
          {settingGroups.map(group => (
            <div
              key={group.id}
              className={`settings-group ${activeGroup === group.id ? 'active' : ''}`}
              onClick={() => setActiveGroup(group.id)}
            >
              {group.label}
            </div>
          ))}
        </div>

        <div className="settings-content">
          <h3>{settingGroups.find(g => g.id === activeGroup)?.label}</h3>

          {settings[activeGroup]?.map(setting => (
            <div key={setting.id} className="setting-item">
              <div className="setting-info">
                <h4>{setting.label}</h4>
                <p>{setting.description}</p>
              </div>
              <div className="setting-control">
                {setting.component}
              </div>
            </div>
          ))}

          <div className="settings-actions">
            <button className="btn-primary">Save Changes</button>
            <button className="btn-secondary">Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsView };