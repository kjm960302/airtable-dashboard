'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const router = useRouter();
  const [baseId, setBaseId] = useState('');
  const [tableName, setTableName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedBaseId = localStorage.getItem('airtable_base_id') || '';
    const savedTableName = localStorage.getItem('airtable_table_name') || '';
    setBaseId(savedBaseId);
    setTableName(savedTableName);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage
    if (baseId) {
      localStorage.setItem('airtable_base_id', baseId);
    } else {
      localStorage.removeItem('airtable_base_id');
    }

    if (tableName) {
      localStorage.setItem('airtable_table_name', tableName);
    } else {
      localStorage.removeItem('airtable_table_name');
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem('airtable_base_id');
    localStorage.removeItem('airtable_table_name');
    setBaseId('');
    setTableName('');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Airtable Settings
          </h1>
          <p className="text-gray-600">
            Configure your Airtable Base connection
          </p>
        </div>

        {/* Settings Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Base ID */}
            <div>
              <label htmlFor="baseId" className="block text-sm font-medium text-gray-700 mb-2">
                Airtable Base ID
              </label>
              <input
                type="text"
                id="baseId"
                value={baseId}
                onChange={(e) => setBaseId(e.target.value)}
                placeholder="appXXXXXXXXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                Find this in your Airtable Base under Help → API documentation
              </p>
            </div>

            {/* Table Name */}
            <div>
              <label htmlFor="tableName" className="block text-sm font-medium text-gray-700 mb-2">
                Table Name
              </label>
              <input
                type="text"
                id="tableName"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="Table 1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                The exact name of your table in Airtable (case-sensitive)
              </p>
            </div>

            {/* Success Message */}
            {saved && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium">
                  Settings saved successfully! Return to dashboard to see your data.
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save Settings
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Reset to Sample Data
              </button>
            </div>
          </form>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            How to get your Airtable credentials:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Go to <a href="https://airtable.com" target="_blank" rel="noopener noreferrer" className="underline">airtable.com</a> and open your base</li>
            <li>Click on <strong>Help</strong> in the top right corner</li>
            <li>Select <strong>API documentation</strong></li>
            <li>Your Base ID will be shown at the top (starts with "app")</li>
            <li>Your table name is visible in the left sidebar of your base</li>
          </ol>
          <div className="mt-4 p-3 bg-white rounded border border-blue-300">
            <p className="text-sm text-blue-900 font-medium">Required table structure:</p>
            <ul className="mt-2 text-sm text-blue-800 space-y-1">
              <li>• <code className="bg-blue-100 px-1 rounded">name</code> (Single line text)</li>
              <li>• <code className="bg-blue-100 px-1 rounded">value</code> (Number)</li>
              <li>• <code className="bg-blue-100 px-1 rounded">category</code> (Single line text)</li>
              <li>• <code className="bg-blue-100 px-1 rounded">date</code> (Date)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
