import React from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

// Student Profile Modal
export function StudentProfileModal({ student, onClose, onCollectFee }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/90 rounded-[32px] p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-5">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-800">Student Profile Bio</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center text-xs">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
              {student.fullName ? student.fullName[0] : 'S'}
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">{student.fullName}</h4>
              <p className="text-brand-600 font-mono font-bold mt-0.5">{student.student_id}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700">
                {student.courseStatus || 'Active Student'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-slate-700 font-medium">
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Course</span>
              <span className="font-bold text-slate-800">{student.course}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Contact</span>
              <span className="font-bold text-slate-800">{student.contact}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Net Payable Fee</span>
              <span className="font-black text-brand-600 text-sm">₹{(student.finalAmount || student.fees || 0).toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">City / Location</span>
              <span className="font-bold text-slate-800">{student.city || 'Jaipur'}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            onClick={() => { onCollectFee(student.student_id); onClose(); }}
            className="px-5 py-2 rounded-full bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:bg-brand-700 transition"
          >
            Collect Fee
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Course Modal
export function AddCourseModal({ isOpen, onClose, onCourseAdded }) {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const totalfees = Number(e.target.totalfees.value);
    const duration = e.target.duration.value;
    const description = e.target.description.value;

    try {
      await api.addCourse({ name, totalfees, duration, description });
    } catch(err) {}

    onCourseAdded({ _id: 'c_' + Date.now(), name, totalfees, duration, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/90 rounded-[32px] p-6 sm:p-8 w-full max-w-md shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-800">Add Academic Course</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center text-xs">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Course Name *</label>
            <input name="name" required placeholder="e.g. Artificial Intelligence" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 focus:outline-none focus:border-brand-500" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Total Fee (₹) *</label>
              <input name="totalfees" type="number" required placeholder="55000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 focus:outline-none focus:border-brand-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Duration *</label>
              <input name="duration" required placeholder="1 Year" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 focus:outline-none focus:border-brand-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
            <textarea name="description" required placeholder="Course overview and syllabus..." rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 focus:outline-none focus:border-brand-500"></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-full bg-brand-600 text-white font-bold shadow-md shadow-brand-500/20 hover:bg-brand-700">Add Course</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Collect Fee Modal
export function CollectFeeModal({ isOpen, onClose, students = [], defaultStudentId, onFeeCollected }) {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sId = e.target.student_id.value;
    const amt = Number(e.target.amount.value);
    const pMode = e.target.paymentMode.value;
    const stu = students.find(s => s.student_id === sId);

    const newF = {
      _id: 'f_' + Date.now(),
      invoiceNumber: 'INV-' + Date.now().toString().slice(-6),
      student_id: sId,
      fullName: stu ? stu.fullName : 'Student',
      amount: amt,
      paymentMode: pMode,
      createdAt: new Date().toISOString()
    };

    try {
      await api.createFee({ student_id: sId, amount: amt, paymentMode: pMode });
    } catch(err) {}

    onFeeCollected(newF);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/90 rounded-[32px] p-6 sm:p-8 w-full max-w-md shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-800">Record Fee Collection</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center text-xs">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Student *</label>
            <select name="student_id" defaultValue={defaultStudentId} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 font-medium focus:outline-none focus:border-brand-500">
              <option value="">-- Choose Student --</option>
              {students.map(s => <option key={s.student_id} value={s.student_id}>{s.student_id} - {s.fullName}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Amount to Pay (₹) *</label>
            <input name="amount" type="number" required placeholder="Amount Paid" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-900 font-black text-sm focus:outline-none focus:border-brand-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Payment Mode *</label>
            <select name="paymentMode" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 font-medium focus:outline-none focus:border-brand-500">
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-full bg-brand-600 text-white font-bold shadow-md shadow-brand-500/20 hover:bg-brand-700">Submit & View Receipt</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Invoice Modal (Printable)
export function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] p-8 max-w-xl w-full shadow-2xl space-y-6 border border-slate-100" id="printArea">
        <div className="flex justify-between items-start border-b-2 border-brand-600 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">EduCore Academy</h2>
            <p className="text-xs text-slate-500">Official Student Tuition & Fee Receipt</p>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">PAID</span>
            <p className="text-xs font-mono font-bold mt-1 text-slate-600">{invoice.invoiceNumber}</p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl text-xs grid grid-cols-2 gap-4">
          <div>
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Student Name</span>
            <span className="font-extrabold text-slate-900 text-sm">{invoice.fullName}</span>
            <span className="block text-slate-500 font-mono mt-0.5">ID: {invoice.student_id}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Payment Mode</span>
            <span className="font-extrabold text-slate-900">{invoice.paymentMode}</span>
            <span className="block text-brand-600 font-black text-base mt-0.5">₹{Number(invoice.amount).toLocaleString('en-IN')}.00</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <button onClick={() => window.print()} className="px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-brand-500/20">
            <i className="fa-solid fa-print"></i> Print Invoice
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Auth Modal
export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, register } = useAuth();
  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/90 rounded-[32px] p-6 sm:p-8 w-full max-w-sm shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-800">
            {authMode === 'login' ? 'Admin Portal Sign In' : 'Create Admin Account'}
          </h3>
          <button onClick={closeAuthModal} className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center text-xs">✕</button>
        </div>

        <form onSubmit={async (e) => {
          e.preventDefault();
          if (authMode === 'login') {
            await login(e.target.email.value, e.target.password.value);
          } else {
            await register(e.target.name.value, e.target.email.value, e.target.password.value);
          }
        }} className="space-y-3.5 text-xs">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input name="name" required placeholder="Administrator Name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 focus:outline-none focus:border-brand-500" />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
            <input name="email" type="email" required placeholder="admin@school.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 focus:outline-none focus:border-brand-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <input name="password" type="password" required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 focus:outline-none focus:border-brand-500" />
          </div>
          
          <button type="submit" className="w-full py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold transition shadow-md shadow-brand-500/25">
            {authMode === 'login' ? 'Sign In' : 'Register Admin'}
          </button>

          <div className="text-center pt-1">
            <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-brand-600 hover:underline font-bold text-xs">
              {authMode === 'login' ? "Don't have an account? Register" : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
