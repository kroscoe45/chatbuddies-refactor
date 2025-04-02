// src/pages/Dashboard/Views/PlatformConfigurationsView/PlatformConfigurationsView.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@components/common/Button/Button';
import { Card } from '@components/common/Card';
import '@pages/Dashboard/Dashboard.css';
import '../views.css';

// Types based on the API documentation
interface ChatWidgetSetting {
  id: number;
  name: string;
  location?: string;
  chatwidget_type?: string;
  title?: string;
  greeting?: string;
}

const PlatformConfigurationsView: React.FC = () => {
  const [configurations, setConfigurations] = useState<ChatWidgetSetting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // In a real implementation, this would fetch from your API
  useEffect(() => {
    // Mock fetching data - replace with actual API call
    const fetchConfigurations = async () => {
      try {
        setLoading(true);
        // This would be your API call
        // const response = await api.get('/api/chatwidget-settings/');

        // Mock data for demonstration
        const mockData = {
          count: 3,
          next: null,
          previous: null,
          results: [
            {
              id: 1,
              name: "Customer Support Widget",
              location: "on-site",
              chatwidget_type: "automatic",
              title: "Support Chat",
              greeting: "How can I help you today?"
            },
            {
              id: 2,
              name: "Sales Inquiry Widget",
              location: "off-site",
              chatwidget_type: "manual",
              title: "Sales Assistance",
              greeting: "Interested in our products?"
            },
            {
              id: 3,
              name: "Product Help Widget",
              location: "on-site",
              chatwidget_type: "automatic",
              title: "Product Help",
              greeting: "Need help with our products?"
            }
          ]
        };

        setConfigurations(mockData.results);
        setLoading(false);
      } catch (err) {
        setError("Failed to load configurations");
        setLoading(false);
        console.error("Error fetching configurations:", err);
      }
    };

    fetchConfigurations();
  }, []);

  // Handle clicking "New Configuration" button
  const handleNewConfiguration = () => {
    // In a real implementation, this would navigate to a new configuration form
    console.log("Create new configuration");
    // navigate('/dashboard/configurations/new');
  };

  // Handle edit configuration
  const handleEdit = (id: number) => {
    console.log(`Edit configuration ${id}`);
    // navigate(`/dashboard/configurations/edit/${id}`);
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Platform Configurations</h2>
        <Button
          variant="primary"
          onClick={handleNewConfiguration}
        >
          New Configuration
        </Button>
      </div>

      {loading &&
          <Card
              title="Loading"
              content="Loading configurations..."
          />
      }

      {error &&
          <Card
              title="Error"
              content={error}
              className="error-card"
          />
      }

      {!loading && !error && (
        <div>
          <h3>ChatWidget Configurations</h3>

          {configurations.length === 0 ? (
            <Card
              title="No Configurations"
              content="No configurations found. Click 'New Configuration' to create one."
            />
          ) : (
            <div className="card-grid">
              {configurations.map(config => (
                <Card
                  key={config.id}
                  title={config.name}
                  content={
                    <div className="config-details">
                      <div className="config-detail">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{config.location}</span>
                      </div>
                      <div className="config-detail">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value">{config.chatwidget_type}</span>
                      </div>
                    </div>
                  }
                  buttons={
                    <>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => handleEdit(config.id)}
                      >
                        Edit
                      </Button>
                    </>
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { PlatformConfigurationsView };