import React from 'react';

export default function CourseCatalog({ courses = [], onOpenAddCourse, onEnrollCourse }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">Academic Course Catalog</h2>
          <p className="text-xs text-slate-500 font-medium">Explore academic programs, fee structures, and durations</p>
        </div>
        <button
          onClick={onOpenAddCourse}
          className="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <i className="fa-solid fa-plus text-[10px]"></i> Add New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map(c => (
          <div key={c._id || c.name} className="frosted-card p-6 rounded-[28px] flex flex-col justify-between group hover:shadow-xl hover:shadow-brand-500/5 transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-200/50">
                  <i className="fa-solid fa-clock mr-1"></i> {c.duration}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-600 transition leading-snug">
                {c.name}
              </h3>
              <p className="text-xs text-slate-500 mt-2 font-medium line-clamp-3">
                {c.description || 'Comprehensive curriculum with hands-on practical learning.'}
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Program Fee</span>
                <p className="text-lg font-black text-slate-900">₹{Number(c.totalfees).toLocaleString('en-IN')}</p>
              </div>
              <button
                onClick={() => onEnrollCourse(c.name)}
                className="px-4 py-1.5 rounded-full bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 text-xs font-bold transition border border-brand-200/60"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
