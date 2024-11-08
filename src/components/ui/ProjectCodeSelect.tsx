import React, { useState } from 'react';
import { PROJECT_CODES } from '../../types/project';

interface ProjectCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const ProjectCodeSelect: React.FC<ProjectCodeSelectProps> = ({
  value,
  onChange,
  required
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredProjects = PROJECT_CODES.filter(project => 
    project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">
        Project Code {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search project code..."
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {isOpen && filteredProjects.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {filteredProjects.map((project) => (
              <div
                key={project.code}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${
                  value === project.code ? 'bg-indigo-50' : ''
                }`}
                onClick={() => {
                  onChange(project.code);
                  setSearchTerm(project.code);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  <span className="font-medium">{project.code}</span>
                  <span className="ml-2 text-gray-500">{project.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};