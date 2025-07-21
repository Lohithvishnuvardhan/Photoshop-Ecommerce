import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const TemporaryAuthNotice: React.FC = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
        <div>
          <h3 className="text-sm font-medium text-yellow-800">
            Authentication Temporarily Disabled
          </h3>
          <p className="text-sm text-yellow-700 mt-1">
            Login and signup features are currently disabled for development. 
            All functionality works with mock data.
          </p>
        </div>
      </div>
    </div>
  );
};