import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, FileText, Map, Plus, List, Settings, BarChart2, X,
} from 'lucide-react';

const Sidebar = ({ mobile = false, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const citizenLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/report', icon: Plus, label: 'Report Issue' },
    { to: '/my-reports', icon: List, label: 'My Reports' },
    { to: '/map', icon: Map, label: 'Issue Map' },
    { to: '/track', icon: FileText, label: 'Track Issue' },
  ];

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/reports', icon: List, label: 'All Complaints' },
    { to: '/map', icon: Map, label: 'Issue Map' },
    { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
  ];

  const links = user?.role === 'citizen' ? citizenLinks : adminLinks;

  const isActive = (to) => location.pathname === to;

  return (
    <aside className={`${mobile ? 'w-full' : 'w-64'} flex flex-col h-full bg-white border-r border-gray-200`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
            <Map className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-gray-900">CivicFlow</span>
        </div>
        {mobile && (
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-3 flex-1 overflow-y-auto">
        <div className="mb-4 px-2">
          <div className="flex items-center gap-2 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={mobile ? onClose : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive(to)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">CivicFlow v1.0 · Hackathon Demo</p>
      </div>
    </aside>
  );
};

export default Sidebar;

