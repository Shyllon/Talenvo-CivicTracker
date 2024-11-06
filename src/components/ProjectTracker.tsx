import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'ongoing' | 'completed' | 'delayed';
  progress: number;
  startDate: string;
  endDate: string;
}

interface ProjectTrackerProps {
  projects: Project[];
}

export default function ProjectTracker({ projects }: ProjectTrackerProps) {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'ongoing':
        return 'text-blue-500';
      case 'completed':
        return 'text-green-500';
      case 'delayed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'ongoing':
        return <Clock className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'delayed':
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
              <p className="text-gray-600 mt-1">{project.description}</p>
            </div>
            <div className={`flex items-center gap-2 ${getStatusColor(project.status)}`}>
              {getStatusIcon(project.status)}
              <span className="capitalize">{project.status}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <div>
                <span className="text-gray-500">Start Date:</span>
                <span className="ml-2 text-gray-700">{project.startDate}</span>
              </div>
              <div>
                <span className="text-gray-500">End Date:</span>
                <span className="ml-2 text-gray-700">{project.endDate}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}