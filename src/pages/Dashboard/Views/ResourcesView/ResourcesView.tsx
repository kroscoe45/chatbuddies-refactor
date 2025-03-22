// src/pages/Dashboard/views/ResourcesView.tsx
import React, { useState } from 'react';
import '@pages/Dashboard/Dashboard.css';
import '../views.css';

type ResourceCategory = {
  id: string;
  name: string;
};

type Resource = {
  id: string;
  name: string;
  category: string;
  description: string;
  type: 'video' | 'document' | 'link';
  url: string;
  lastUpdated: string;
};

const ResourcesView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: ResourceCategory[] = [
    {id: 'all', name: 'All Resources'},
    {id: 'getting-started', name: 'Getting Started'},
    {id: 'guides', name: 'User Guides'},
    {id: 'tutorials', name: 'Video Tutorials'},
    {id: 'apis', name: 'API Documentation'}
  ];

  const resources: Resource[] = [
    {
      id: '1',
      name: 'Getting Started Guide',
      category: 'getting-started',
      description: 'Learn the basics of using our platform',
      type: 'document',
      url: '/resources/getting-started-guide.pdf',
      lastUpdated: '2023-05-10'
    },
    {
      id: '2',
      name: 'Campaign Creation Tutorial',
      category: 'tutorials',
      description: 'Step-by-step tutorial on creating your first campaign',
      type: 'video',
      url: 'https://example.com/videos/campaign-tutorial',
      lastUpdated: '2023-04-22'
    },
    {
      id: '3',
      name: 'API Reference',
      category: 'apis',
      description: 'Complete API documentation for developers',
      type: 'link',
      url: 'https://api.example.com/docs',
      lastUpdated: '2023-06-01'
    },
    {
      id: '4',
      name: 'User Administration Guide',
      category: 'guides',
      description: 'Learn how to manage users and permissions',
      type: 'document',
      url: '/resources/user-admin-guide.pdf',
      lastUpdated: '2023-05-15'
    }
  ];

  // Filter resources based on active category
  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(resource => resource.category === activeCategory);

  // Get icon for resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎬';
      case 'document':
        return '📄';
      case 'link':
        return '🔗';
      default:
        return '📁';
    }
  };

  return (
    <div className="view-container">
      <h2>Resources</h2>

      <div className="resources-layout">
        <div className="resources-sidebar">
          {categories.map(category => (
            <div
              key={category.id}
              className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>

        <div className="resources-content">
          <div className="resources-header">
            <h3>{categories.find(c => c.id === activeCategory)?.name}</h3>
            <div className="search-box">
              <input type="text" placeholder="Search resources..."/>
            </div>
          </div>

          <div className="resources-grid">
            {filteredResources.map(resource => (
              <div key={resource.id} className="resource-card">
                <div className="resource-icon">{getResourceIcon(resource.type)}</div>
                <div className="resource-info">
                  <h4>{resource.name}</h4>
                  <p>{resource.description}</p>
                  <div className="resource-meta">
                    <span>Updated: {resource.lastUpdated}</span>
                    <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                  </div>
                </div>
                <div className="resource-actions">
                  <a href={resource.url} target="_blank" rel="noopener noreferrer"
                     className="btn-secondary">
                    {resource.type === 'document' ? 'Download' : 'View'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ResourcesView };