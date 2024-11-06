import React from 'react';
import { User, Award, Briefcase, CheckCircle } from 'lucide-react';

interface PoliticianCardProps {
  name: string;
  party: string;
  constituency: string;
  imageUrl: string;
  accomplishments: string[];
  ongoingProjects: string[];
}

export default function PoliticianCard({
  name,
  party,
  constituency,
  imageUrl,
  accomplishments,
  ongoingProjects,
}: PoliticianCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{name}</h3>
          <p className="text-orange-200">{party}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <User size={18} className="text-blue-600" />
          <span className="text-gray-600">{constituency}</span>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
              <Award size={18} className="text-orange-500" />
              Key Accomplishments
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {accomplishments.map((item, index) => (
                <li key={index} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
              <Briefcase size={18} className="text-green-500" />
              Ongoing Projects
            </h4>
            <ul className="space-y-2">
              {ongoingProjects.map((project, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">{project}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View Full Profile
        </button>
      </div>
    </div>
  );
}