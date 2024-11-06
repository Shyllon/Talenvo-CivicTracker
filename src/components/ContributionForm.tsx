import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

interface ContributionFormProps {
  onSubmit: (data: {
    type: string;
    description: string;
    evidence: string;
  }) => void;
}

export default function ContributionForm({ onSubmit }: ContributionFormProps) {
  const [formData, setFormData] = useState({
    type: 'update',
    description: '',
    evidence: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ type: 'update', description: '', evidence: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Submit Information</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Type of Contribution</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none"
          >
            <option value="update">Update Existing Information</option>
            <option value="correction">Submit Correction</option>
            <option value="new">Add New Information</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none min-h-[120px]"
            placeholder="Provide detailed information about your contribution..."
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Supporting Evidence</label>
          <textarea
            value={formData.evidence}
            onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none"
            placeholder="Add links to news articles, official documents, or other verifiable sources..."
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4 flex gap-3">
          <AlertCircle className="text-blue-500 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            All submissions are reviewed for accuracy before being published. Please ensure your contribution is factual and can be verified.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          <Send size={18} />
          Submit Contribution
        </button>
      </div>
    </form>
  );
}