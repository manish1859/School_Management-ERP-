import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab, backendOnline }) {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'students', label: 'Students' },
    { id: 'new-admission', label: 'Admissions' },
    { id: 'courses', label: 'Courses' },
    { id: 'fees', label: 'Finance' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <header className="px-6 py-4 flex items-center justify-between relative z-40 max-w-[1440px] mx-auto w-full">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-400 flex items-center justify-center text-white shadow-md shadow-brand-500/25 ring-4 ring-white/60">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M3 12h3m12 0h3M12 3v3m0 12v3" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <div className="hidden lg:block">
          <span className="font-extrabold text-base tracking-tight text-slate-800">EduCore</span>
        </div>
      </div>

      {/* Center Floating Pill Navigation - Exactly as in the design */}
      <nav className="frosted-pill px-2 py-1.5 rounded-full shadow-sm flex items-center gap-1 border border-white/80">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Quick circular icon actions + User Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Phone Action */}
        <button
          title="Campus Helpline"
          onClick={() => alert('Support Helpline: +91 98765 43210')}
          className="w-9 h-9 rounded-full frosted-card flex items-center justify-center text-slate-600 hover:text-brand-600 hover:bg-white transition"
        >
          <i className="fa-solid fa-phone text-xs"></i>
        </button>

        {/* Calendar Action */}
        <button
          title="Academic Calendar"
          onClick={() => setActiveTab('dashboard')}
          className="w-9 h-9 rounded-full frosted-card flex items-center justify-center text-slate-600 hover:text-brand-600 hover:bg-white transition"
        >
          <i className="fa-regular fa-calendar text-xs"></i>
        </button>

        {/* Search Action */}
        <button
          title="Quick Search"
          onClick={() => setActiveTab('students')}
          className="w-9 h-9 rounded-full frosted-card flex items-center justify-center text-slate-600 hover:text-brand-600 hover:bg-white transition"
        >
          <i className="fa-solid fa-magnifying-glass text-xs"></i>
        </button>

        {/* Backend Status Dot / Sync */}
        <div
          title={backendOnline ? 'Backend Online (Port 4600)' : 'Backend Standby'}
          className="w-9 h-9 rounded-full frosted-card flex items-center justify-center text-slate-600 transition"
        >
          <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-400'}`}></span>
        </div>

        {/* User Profile Pill */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2 pl-1">
            <div className="frosted-card pl-1.5 pr-3 py-1 rounded-full flex items-center gap-2 border border-white/90">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                {(user?.name || 'J')[0].toUpperCase()}
              </div>
              <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
                {user?.name || 'James'}
              </span>
              <button onClick={logout} title="Logout" className="text-slate-400 hover:text-rose-500 text-xs">
                <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="frosted-card px-4 py-1.5 rounded-full text-xs font-bold text-brand-600 hover:bg-white transition shadow-sm border border-white/90"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
