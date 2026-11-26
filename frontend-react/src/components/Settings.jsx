import React from 'react';

export default function Settings() {
  return (
    <div className="max-w-xl mx-auto frosted-card p-6 sm:p-8 rounded-[32px] space-y-5">
      <div className="pb-3 border-b border-slate-100">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Portal Diagnostics & Settings</h2>
        <p className="text-xs text-slate-500 font-medium">Architecture, backend connectivity, and aesthetic design engine</p>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex justify-between py-2.5 border-b border-slate-100">
          <span className="text-slate-500 font-semibold">Visual Design Theme</span>
          <span className="text-brand-600 font-extrabold">Light Frosted Glassmorphism & Lavender Pastel</span>
        </div>
        <div className="flex justify-between py-2.5 border-b border-slate-100">
          <span className="text-slate-500 font-semibold">Frontend Stack</span>
          <span className="text-slate-800 font-bold">React 18 Component Tree + Tailwind CSS</span>
        </div>
        <div className="flex justify-between py-2.5 border-b border-slate-100">
          <span className="text-slate-500 font-semibold">Backend Port</span>
          <span className="text-slate-800 font-mono font-bold">http://localhost:4600</span>
        </div>
        <div className="flex justify-between py-2.5 border-b border-slate-100">
          <span className="text-slate-500 font-semibold">Authentication Engine</span>
          <span className="text-emerald-600 font-bold">JWT Bearer Token Protected</span>
        </div>
        <div className="flex justify-between py-2.5">
          <span className="text-slate-500 font-semibold">Font Family</span>
          <span className="text-slate-800 font-bold">Plus Jakarta Sans</span>
        </div>
      </div>
    </div>
  );
}
