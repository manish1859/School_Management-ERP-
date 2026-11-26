import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard({
  students = [],
  courses = [],
  fees = [],
  totalRevenue = 0,
  onNavigate,
  onOpenAddCourse,
  onSelectStudent
}) {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState('Current Month');

  // Calculate stats
  const totalStudents = students.length;
  const activeCourses = courses.length;
  const scholarshipCount = students.filter(s => Number(s.scholarship) > 0).length;

  return (
    <div className="space-y-6">
      {/* Greeting Header - Exactly as in the design */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            Good morning, {user?.name || 'James'}!
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Here's what is happening across your campus today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('new-admission')}
            className="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus text-[10px]"></i> New Student
          </button>
        </div>
      </div>

      {/* 4 Top Cards Grid - Matching the design card shapes & layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Bank Balance / Total Revenue */}
        <div className="frosted-card p-5 rounded-[24px] relative group hover:shadow-lg hover:shadow-brand-500/5 transition">
          <div className="flex items-center justify-between text-slate-700 mb-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 text-sm">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
            </button>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            ₹{totalRevenue > 0 ? totalRevenue.toLocaleString('en-IN') : '143,624'}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">Your fee balance</p>
        </div>

        {/* Card 2: Total Enrolled Students */}
        <div className="frosted-card p-5 rounded-[24px] relative group hover:shadow-lg hover:shadow-brand-500/5 transition">
          <div className="flex items-center justify-between text-slate-700 mb-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 text-sm">
              <i className="fa-solid fa-chart-pie"></i>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {totalStudents > 0 ? totalStudents : '12'}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">Enrolled students</p>
        </div>

        {/* Card 3: Academic Programs */}
        <div className="frosted-card p-5 rounded-[24px] relative group hover:shadow-lg hover:shadow-brand-500/5 transition">
          <div className="flex items-center justify-between text-slate-700 mb-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 text-sm">
              <i className="fa-solid fa-id-badge"></i>
            </div>
            <button onClick={onOpenAddCourse} className="text-brand-600 hover:text-brand-700 text-[11px] font-bold">
              + Add
            </button>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {activeCourses > 0 ? activeCourses : '7'}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">Courses offering today</p>
        </div>

        {/* Card 4: Recent Week Fees */}
        <div className="frosted-card p-5 rounded-[24px] relative group hover:shadow-lg hover:shadow-brand-500/5 transition">
          <div className="flex items-center justify-between text-slate-700 mb-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 text-sm">
              <i className="fa-solid fa-credit-card"></i>
            </div>
            <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">+14%</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            ₹3,287.49
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">This week's collection</p>
        </div>
      </div>

      {/* Main Grid: Left (Chart + Recent list) and Right (Status + Success Rate) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column (8 cols): Admissions Chart & Recent Students */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Main Chart Card - Exactly as in the design */}
          <div className="frosted-card p-6 rounded-[28px]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-800">Average Admissions & Fees</h3>
                <p className="text-xs text-slate-400 font-medium">Fee collections overview from all campus channels</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="frosted-subtle px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer">
                  <i className="fa-regular fa-calendar text-[11px] text-slate-400"></i>
                  <span>{selectedMonth}</span>
                  <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-1"></i>
                </div>
                <button
                  onClick={() => onNavigate('fees')}
                  className="w-8 h-8 rounded-full frosted-subtle flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
                  title="Full details"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                </button>
              </div>
            </div>

            {/* Offline vs Online Pills */}
            <div className="flex flex-wrap items-center gap-6 mb-6 pt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Cash / Offline</span>
                <span className="text-lg font-black text-slate-900">₹12,201<span className="text-xs font-medium text-slate-400">.00</span></span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600">-11%</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">UPI / Online</span>
                <span className="text-lg font-black text-slate-900">₹100,799<span className="text-xs font-medium text-slate-400">.00</span></span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-600">+9%</span>
              </div>
            </div>

            {/* Visual Bar Chart (Custom CSS representation matching the image) */}
            <div className="h-56 w-full pt-4 relative flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-100 pb-4">
              {[
                { m: 'Jan', h: 30, active: false },
                { m: 'Feb', h: 55, active: false },
                { m: 'Mar', h: 45, active: false },
                { m: 'Apr', h: 65, active: false },
                { m: 'May', h: 88, active: true, val1: '₹210', val2: '₹245' },
                { m: 'Jun', h: 95, active: false },
                { m: 'Jul', h: 40, active: false },
                { m: 'Aug', h: 48, active: false },
                { m: 'Sep', h: 35, active: false }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip on active bar */}
                  {bar.active && (
                    <div className="absolute -top-12 bg-white px-2.5 py-1.5 rounded-xl shadow-md border border-slate-100 text-[10px] font-bold text-slate-800 flex flex-col items-center whitespace-nowrap z-10">
                      <span className="text-slate-400 text-[9px]">{bar.val1} fee</span>
                      <span className="text-brand-600">{bar.val2} total</span>
                      <div className="w-2 h-2 bg-white rotate-45 -mb-2 mt-0.5 shadow-sm"></div>
                    </div>
                  )}

                  {/* Bar shape */}
                  <div
                    style={{ height: `${bar.h}%` }}
                    className={`w-full max-w-[36px] rounded-t-xl transition-all duration-300 relative ${
                      bar.active
                        ? 'bg-gradient-to-t from-brand-600 to-brand-500 shadow-md shadow-brand-500/20'
                        : 'bg-brand-100/70 hover:bg-brand-200 group-hover:bg-brand-200'
                    }`}
                  >
                    {/* Pattern lines on the bar like the design */}
                    <div className="w-full h-full opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.7)_3px,rgba(255,255,255,0.7)_6px)] rounded-t-xl"></div>
                  </div>

                  {/* Month Label */}
                  <span className={`text-[11px] font-semibold mt-3 ${bar.active ? 'text-brand-600 font-bold' : 'text-slate-400'}`}>
                    {bar.m}
                  </span>
                </div>
              ))}
            </div>

            {/* Chart Footer Note */}
            <div className="flex items-center justify-between pt-3 text-[11px] text-slate-400">
              <span>Showing Jan - Sep 2026 Academic Records</span>
              <span className="font-semibold text-brand-600 cursor-pointer" onClick={() => onNavigate('fees')}>View full ledger →</span>
            </div>
          </div>

          {/* Recent Records Table Card - Matching bottom left of the design */}
          <div className="frosted-card p-6 rounded-[28px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-slate-800">Recent Admissions & Activity</h3>
              <button onClick={() => onNavigate('students')} className="text-xs font-bold text-brand-600 hover:text-brand-700">
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {(students.length > 0 ? students.slice(-3).reverse() : [
                { fullName: 'Hannah Morgan', course: 'Full Stack Development', city: 'Jaipur', time: '1:24 PM', tag: 'General', status: 'Active' },
                { fullName: 'Megan Clark', course: 'Data Science & AI', city: 'Delhi', time: '12:32 PM', tag: 'Scholarship', status: 'Verified' }
              ]).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectStudent && onSelectStudent(item)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/50 hover:bg-white/80 border border-white/60 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-400 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {(item.fullName || 'S')[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-none">{item.fullName}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.course || 'Academic Program'}</p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-4 text-xs">
                    <span className="text-slate-500 font-medium text-[11px]">{item.city || 'Campus'}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                      {item.tag || item.category || 'Enrolled'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-600">
                      {item.courseStatus || 'Active'}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-slate-400">
                    {item.time || 'Today'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Formation Status & Success Rate */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Card 1: Formation Status - Exactly as in the design */}
          <div className="frosted-card p-6 rounded-[28px] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Session Status</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Academic cycle 2026-27</p>
              </div>
              <button
                onClick={() => onNavigate('new-admission')}
                className="w-8 h-8 rounded-full frosted-subtle flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">In progress</span>
                <span className="text-brand-600 font-bold">78%</span>
              </div>
              
              {/* Rounded Lavender Progress Bar */}
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full w-[78%] transition-all duration-500"></div>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-xs font-bold text-slate-800 block">Estimated Processing</span>
              <p className="text-xs text-slate-400">4-5 Business Days for enrollment review</p>
            </div>

            <button
              onClick={() => onNavigate('students')}
              className="w-full py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200/80 shadow-sm transition"
            >
              View status
            </button>
          </div>

          {/* Card 2: Success Rate / Collection Meter - Exactly as in the design */}
          <div className="frosted-card p-6 rounded-[28px] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Success Rate</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Fee & enrollment completion</p>
              </div>
              <button
                onClick={() => onNavigate('fees')}
                className="w-8 h-8 rounded-full frosted-subtle flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
              </button>
            </div>

            {/* Radial Semi-Circle Gauge representation */}
            <div className="py-2 flex flex-col items-center justify-center relative">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-600 border border-brand-200/50 mb-2">
                +91.2%
              </span>

              {/* Semi-circular dashed meter */}
              <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
                {/* SVG Semi-Circle Arch */}
                <svg className="w-44 h-44 absolute -top-1" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#ede9fe"
                    strokeWidth="10"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    transform="rotate(180 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#7c5cfc"
                    strokeWidth="10"
                    strokeDasharray="4 4"
                    strokeDashoffset="65"
                    strokeLinecap="round"
                    transform="rotate(180 50 50)"
                  />
                </svg>

                {/* Big Center Metric */}
                <div className="text-center z-10 pb-1">
                  <span className="text-2xl font-black text-slate-900 tracking-tight block">51.2%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">+5%</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 text-center max-w-[210px] mt-3 font-medium">
                Hooray! You reached 51% target today and verified fees this week.
              </p>
            </div>

            {/* Bottom 2 mini metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Students</span>
                <span className="text-sm font-extrabold text-slate-900">15,110</span>
              </div>
              <div className="border-l border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">New Users</span>
                <span className="text-sm font-extrabold text-slate-900">91,130</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
