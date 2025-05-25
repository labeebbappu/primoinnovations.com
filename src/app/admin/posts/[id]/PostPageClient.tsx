'use client';

import { useState } from 'react';
import ViewPost from './View';
import EditPost from './Edit';

interface PostPageClientProps {
  id: string;
}

export default function PostPageClient({ id }: PostPageClientProps) {
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Post Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('view')}
            className={`px-4 py-2 rounded-md ${activeTab === 'view' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            View
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 rounded-md ${activeTab === 'edit' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Edit
          </button>
        </div>
      </div>

      {activeTab === 'view' ? (
        <ViewPost id={id} />
      ) : (
        <EditPost id={id} />
      )}
    </div>
  );
}