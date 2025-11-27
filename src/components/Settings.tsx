import { Bell, User, Palette, Database, Shield, Info } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-600">Manage your preferences and account settings</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Profile Settings</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Name</label>
            <input
              type="text"
              defaultValue="Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="developer@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Notifications</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-sm text-gray-900">Project Deadlines</div>
              <div className="text-xs text-gray-600">Get notified when projects are approaching deadline</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-sm text-gray-900">Task Reminders</div>
              <div className="text-xs text-gray-600">Receive reminders for pending tasks</div>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-sm text-gray-900">Weekly Summary</div>
              <div className="text-xs text-gray-600">Get a weekly summary of your progress</div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </label>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Appearance</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Theme</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Accent Color</label>
            <div className="flex gap-3">
              {['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500'].map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-lg ${color} hover:opacity-80 transition-opacity`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Data Management</h3>
        </div>
        <div className="space-y-4">
          <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="text-sm text-gray-900 mb-1">Export Data</div>
            <div className="text-xs text-gray-600">Download all your projects and tasks as JSON</div>
          </button>
          <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="text-sm text-gray-900 mb-1">Import Data</div>
            <div className="text-xs text-gray-600">Import projects from a backup file</div>
          </button>
          <button className="w-full px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-left">
            <div className="text-sm mb-1">Clear All Data</div>
            <div className="text-xs text-red-500">This action cannot be undone</div>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">About</h3>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p>DevProjects v1.0.0</p>
          <p>A modern project management dashboard for developers</p>
          <p className="text-xs text-gray-500 mt-4">Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
