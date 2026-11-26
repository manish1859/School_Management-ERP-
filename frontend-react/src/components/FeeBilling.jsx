import React from 'react';

export default function FeeBilling({ fees = [], onOpenCollectFee, onViewInvoice }) {
  const totalAmount = fees.reduce((sum, f) => sum + (Number(f.amount) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">Finance & Fee Billing</h2>
          <p className="text-xs text-slate-500 font-medium">Verified fee transactions, payment modes, and printable receipts</p>
        </div>
        <button
          onClick={onOpenCollectFee}
          className="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <i className="fa-solid fa-plus text-[10px]"></i> Collect Fee Payment
        </button>
      </div>

      {/* Summary card */}
      <div className="frosted-card p-5 rounded-[24px] flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Net Collection</span>
          <span className="text-2xl font-black text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          {fees.length} Total Receipts
        </span>
      </div>

      <div className="frosted-card rounded-[28px] overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="uppercase bg-slate-50/60 text-slate-400 text-[10px] font-bold tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {fees.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No fee payments recorded yet.
                  </td>
                </tr>
              ) : (
                fees.map(f => (
                  <tr key={f._id || f.invoiceNumber} className="hover:bg-white/60 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-600">{f.invoiceNumber}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{f.fullName}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{f.student_id}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900 text-sm">₹{Number(f.amount).toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200/50">
                        {f.paymentMode}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">{f.createdAt ? new Date(f.createdAt).toLocaleDateString() : 'Today'}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onViewInvoice(f)}
                        className="px-3 py-1 rounded-full bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 text-xs font-bold transition border border-brand-200/60"
                      >
                        Print Receipt
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
