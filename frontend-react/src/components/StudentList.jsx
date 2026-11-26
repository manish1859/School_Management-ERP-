import React, { useState } from 'react';

export default function StudentList({
  students = [],
  courses = [],
  onSelectStudent,
  onCollectFee,
  onNavigate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const filtered = students.filter(s => {
    const q = searchQuery.toLowerCase();
    const matchQ = !q || (s.fullName && s.fullName.toLowerCase().includes(q))
      || (s.student_id && s.student_id.toLowerCase().includes(q))
      || (s.contact && String(s.contact).includes(q));
    const matchC = !courseFilter || s.course === courseFilter;
    const matchG = !genderFilter || s.gender === genderFilter;
    return matchQ && matchC && matchG;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">Student Directory</h2>
          <p className="text-xs text-slate-500 font-medium">Browse, search, and manage all verified student enrollment records</p>
        </div>
        <button
          onClick={() => onNavigate('new-admission')}
          className="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <i className="fa-solid fa-plus text-[10px]"></i> Add New Student
        </button>
      </div>

      {/* Filter Pill Toolbar */}
      <div className="frosted-card p-3 rounded-[24px] flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder="Search by student name, ID or contact..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white/70 border border-slate-200/80 rounded-full pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
            className="bg-white/70 border border-slate-200/80 rounded-full px-3.5 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-brand-500"
          >
            <option value="">All Courses</option>
            {courses.map(c => <option key={c._id || c.name} value={c.name}>{c.name}</option>)}
          </select>

          <select
            value={genderFilter}
            onChange={e => setGenderFilter(e.target.value)}
            className="bg-white/70 border border-slate-200/80 rounded-full px-3.5 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-brand-500"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="frosted-card rounded-[28px] overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="uppercase bg-slate-50/60 text-slate-400 text-[10px] font-bold tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Final Fee</th>
                <th className="py-3 px-4">Scholarship</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No matching student records found.
                  </td>
                </tr>
              ) : (
                filtered.map(s => (
                  <tr key={s._id || s.student_id} className="hover:bg-white/60 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                        {(s.fullName || 'S')[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 leading-none">{s.fullName}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.city || 'Campus'}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-600">{s.student_id}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {s.course}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{s.contact}</td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">
                      ₹{(s.finalAmount || s.fees || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 font-bold text-[10px]">
                        {s.scholarship || 0}% Off
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => onSelectStudent(s)}
                        className="px-3 py-1 rounded-full bg-slate-100 hover:bg-white text-slate-700 font-bold text-xs shadow-sm transition border border-slate-200/60"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => onCollectFee(s.student_id)}
                        className="px-3 py-1 rounded-full bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 font-bold text-xs transition border border-brand-200/60"
                      >
                        Collect Fee
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
