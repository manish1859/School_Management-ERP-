import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, studentCount, courseCount, onOpenCollectFee }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: 'students', label: 'Students Directory', icon: 'fa-user-graduate', count: studentCount },
    { id: 'new-admission', label: 'New Admission', icon: 'fa-id-card-clip' },
    { id: 'courses', label: 'Course Catalog', icon: 'fa-book-bookmark', count: courseCount },
    { id: 'fees', label: 'Fees & Invoices', icon: 'fa-receipt' },
    { id: 'settings', label: 'System Settings', icon: 'fa-sliders' }
  ];

  return (
    <aside className="w-64 bg-slate-900/60 border-r border-slate-800 flex-shrink-0 p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">Modules</p>
        
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
          >
            <i className={`fa-solid ${item.icon} w-5 text-center ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`}></i>
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/20 text-center">
        <i className="fa-solid fa-receipt text-indigo-400 text-xl mb-1.5 block"></i>
        <h4 className="text-xs font-bold text-white">Fee Counter</h4>
        <p className="text-[11px] text-slate-400 mb-3">Accept fee & print invoice</p>
        <button onClick={onOpenCollectFee} className="w-full py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow">
          Collect Fee
        </button>
      </div>
    </aside>
  );
}
