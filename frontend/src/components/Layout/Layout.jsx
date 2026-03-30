import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Settings, User, Home, Send, Heart, Calendar, Search, Users } from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Search Skills', path: '/search', icon: Search },
    { name: 'Get Matched', path: '/get-matched', icon: Heart },
    { name: 'Exchange Skill', path: '/exchange-skill', icon: Send },
    { name: 'Followers', path: '/followers', icon: Users },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 md:inset-auto z-50 w-64 bg-white shadow-lg md:shadow-none transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)} className="text-slate-600">
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 py-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-cyan-600 bg-clip-text text-transparent">
            SkillTrade
          </h1>
          <p className="text-xs text-slate-500 mt-1">Exchange & Learn</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map(({ name, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => {
                navigate(path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(path)
                  ? 'bg-cyan-50 text-cyan-600 border-l-4 border-cyan-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{name}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-slate-200 p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-slate-200">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-slate-600 hover:text-slate-900"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
              <span className="text-slate-600 text-sm md:text-base">Welcome to SkillTrade</span>
              <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-cyan-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
