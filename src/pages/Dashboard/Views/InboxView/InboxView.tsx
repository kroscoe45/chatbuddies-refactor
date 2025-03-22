// src/pages/Dashboard/views/InboxView.tsx
import React, { useState } from 'react';
import '@pages/Dashboard/Dashboard.css';
import '../views.css';

type Message = {
  id: string;
  sender: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
};

const InboxView: React.FC = () => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John Smith',
      subject: 'Project Update',
      body: 'Hi, I wanted to share the latest updates on our project...',
      timestamp: '2023-06-15T10:30:00',
      read: false
    },
    {
      id: '2',
      sender: 'Sarah Johnson',
      subject: 'Meeting Tomorrow',
      body: 'Just a reminder about our meeting scheduled for tomorrow at 2 PM...',
      timestamp: '2023-06-14T16:45:00',
      read: true
    },
    {
      id: '3',
      sender: 'Marketing Team',
      subject: 'Campaign Results',
      body: 'Here are the results from our recent marketing campaign...',
      timestamp: '2023-06-12T09:15:00',
      read: true
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="view-container">
      <h2>Inbox</h2>

      <div className="inbox-layout">
        <div className="message-list">
          {messages.map(message => (
            <div
              key={message.id}
              className={`message-item ${message.read ? 'read' : 'unread'} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="message-sender">{message.sender}</div>
              <div className="message-subject">{message.subject}</div>
              <div className="message-time">{formatDate(message.timestamp)}</div>
            </div>
          ))}
        </div>

        <div className="message-detail">
          {selectedMessage ? (
            <>
              <div className="message-header">
                <h3>{selectedMessage.subject}</h3>
                <div className="message-meta">
                  <div>From: {selectedMessage.sender}</div>
                  <div>Time: {formatDate(selectedMessage.timestamp)}</div>
                </div>
              </div>
              <div className="message-body">
                {selectedMessage.body}
              </div>
              <div className="message-actions">
                <button className="btn-primary">Reply</button>
                <button className="btn-secondary">Forward</button>
                <button className="btn-secondary">Delete</button>
              </div>
            </>
          ) : (
            <div className="no-message-selected">
              Select a message to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { InboxView };