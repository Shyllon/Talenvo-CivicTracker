import React, { useState } from 'react';
import { GithubIcon, Menu, X } from 'lucide-react';
import SearchBar from './components/SearchBar';
import PoliticianCard from './components/PoliticianCard';
import ProjectTracker from './components/ProjectTracker';
import ContributionForm from './components/ContributionForm';

// Sample data
const politicians = [
  {
    name: 'Folake John',
    party: 'All Progressives Congress',
    constituency: 'Abuja Central',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    accomplishments: [
      'Implemented free school lunch program',
      'Built 3 new community health centers',
      'Launched youth employment initiative',
    ],
    ongoingProjects: [
      'Green Energy Initiative Phase 2',
      'Road Infrastructure Improvement',
      'Digital Literacy Program',
    ],
  },
  {
    name: 'Okpokwu Emmanuel',
    party: 'Peoples Democratic Party',
    constituency: 'Abuja North',
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=800',
    accomplishments: [
      'Established water treatment facility',
      'Created 500+ jobs through SME support',
      'Built modern sports complex',
    ],
    ongoingProjects: [
      'Coastal Conservation Project',
      'Tech Hub Development',
      'Healthcare Modernization',
    ],
  },
  {
    name: 'Amina Hassan',
    party: 'New Nigeria People Party',
    constituency: 'Abuja Township',
    imageUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800',
    accomplishments: [
      'Established women empowerment centers',
      'Drought resilience program implementation',
      'Education scholarship program for 1000+ students',
    ],
    ongoingProjects: [
      'Sustainable Agriculture Initiative',
      'Women in Tech Program',
      'Clean Water Access Project',
    ],
  },
  {
    name: 'Chinedu Praise Ebube',
    party: 'Labour Party',
    constituency: 'Abuja East',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    accomplishments: [
      'Modernized local market infrastructure',
      'Initiated renewable energy project',
      'Established vocational training center',
    ],
    ongoingProjects: [
      'Smart City Initiative',
      'Youth Innovation Hub',
      'Agricultural Modernization Program',
    ],
  },
  {
    name: 'Benita Mbulu',
    party: 'Young Progressives Party',
    constituency: 'Abuja Central',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80&w=800',
    accomplishments: [
      'Healthcare digitization project',
      'Public transport system upgrade',
      'Environmental conservation initiative',
    ],
    ongoingProjects: [
      'Digital Healthcare Extension',
      'Green Parks Development',
      'Education Technology Program',
    ],
  },
  {
    name: 'Afolabi Raphael Tijjani',
    party: 'African Democratic Congress',
    constituency: 'Abuja West',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    accomplishments: [
      'Lake Victoria conservation project',
      'Urban housing development program',
      'Youth sports development initiative',
    ],
    ongoingProjects: [
      'Fisheries Modernization',
      'Urban Planning Reform',
      'Cultural Heritage Preservation',
    ],
  },
];

const projects = [
  {
    id: '1',
    title: 'Community Health Center Construction',
    description: 'Building a state-of-the-art health facility to serve the local community',
    status: 'ongoing',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
  },
  {
    id: '2',
    title: 'Digital Literacy Program',
    description: 'Providing computer training and internet access to youth',
    status: 'completed',
    progress: 100,
    startDate: '2023-09-01',
    endDate: '2024-02-28',
  },
  {
    id: '3',
    title: 'Road Infrastructure Project',
    description: 'Upgrading major roads and installing street lights',
    status: 'delayed',
    progress: 40,
    startDate: '2023-11-01',
    endDate: '2024-05-31',
  },
  {
    id: '4',
    title: 'Green Energy Initiative',
    description: 'Installing solar panels in public buildings and schools',
    status: 'ongoing',
    progress: 75,
    startDate: '2024-02-01',
    endDate: '2024-08-31',
  },
  {
    id: '5',
    title: 'Women Empowerment Centers',
    description: 'Establishing skill development and business support centers for women',
    status: 'ongoing',
    progress: 85,
    startDate: '2023-12-01',
    endDate: '2024-05-31',
  },
] as const;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('politicians');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredPoliticians = politicians.filter((politician) => {
    const searchString = `${politician.name} ${politician.constituency} ${politician.party}`.toLowerCase();
    return searchString.includes(searchQuery);
  });

  const handleContribution = (data: any) => {
    console.log('New contribution:', data);
    // Implement contribution handling
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-500">CivicTrack</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('politicians')}
                className={`px-3 py-2 rounded-md ${
                  activeTab === 'politicians'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                Politicians
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-3 py-2 rounded-md ${
                  activeTab === 'projects'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab('contribute')}
                className={`px-3 py-2 rounded-md ${
                  activeTab === 'contribute'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                Contribute
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700"
              >
                <GithubIcon size={24} />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setActiveTab('politicians');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-orange-500"
              >
                Politicians
              </button>
              <button
                onClick={() => {
                  setActiveTab('projects');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-orange-500"
              >
                Projects
              </button>
              <button
                onClick={() => {
                  setActiveTab('contribute');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-orange-500"
              >
                Contribute
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Content Sections */}
        {activeTab === 'politicians' && (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {searchQuery ? `Search Results (${filteredPoliticians.length})` : 'All Politicians'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoliticians.map((politician, index) => (
                <PoliticianCard key={index} {...politician} />
              ))}
            </div>
            {filteredPoliticians.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No politicians found matching your search criteria.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'projects' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Community Projects</h2>
            <ProjectTracker projects={projects} />
          </div>
        )}

        {activeTab === 'contribute' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Submit Your Contribution</h2>
            <ContributionForm onSubmit={handleContribution} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 CivicTrack. All rights reserved.</p>
            <p className="mt-2">
              An open-source project dedicated to transparency in governance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
