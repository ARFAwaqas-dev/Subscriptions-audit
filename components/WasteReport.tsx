
import React from 'react';
import { Subscription } from '../types';

interface WasteReportProps {
  subscriptions: Subscription[];
}

const WasteReport: React.FC<WasteReportProps> = ({ subscriptions }) => {
  if (subscriptions.length === 0) {
    return (
      <div className="bg-emerald-50 p-12 rounded-2xl border border-emerald-100 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check text-emerald-600 text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-emerald-800">Clean Bill of Health!</h3>
        <p className="text-emerald-700 mt-2 max-w-sm mx-auto">None of your subscriptions are currently flagged as waste. All your services are being used regularly.</p>
      </div>
    );
  }

  const totalMonthlyWaste = subscriptions.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
        <div className="bg-rose-600 px-6 py-4 text-white flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
            <i className="fas fa-exclamation-triangle"></i> Potential Waste Report
          </h3>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
            {subscriptions.length} Items Found
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-rose-50 border-b border-rose-100">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-rose-800 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-xs font-bold text-rose-800 uppercase tracking-wider">Monthly</th>
                <th className="px-6 py-3 text-xs font-bold text-rose-800 uppercase tracking-wider">Annual Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {subscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td className="px-6 py-4 font-medium text-gray-800">{sub.name}</td>
                  <td className="px-6 py-4 text-rose-600 font-bold">${sub.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-rose-800 font-bold">${(sub.price * 12).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-rose-50 font-bold text-rose-900">
                <td className="px-6 py-4 text-right">TOTAL WASTE</td>
                <td className="px-6 py-4">${totalMonthlyWaste.toFixed(2)}</td>
                <td className="px-6 py-4">${(totalMonthlyWaste * 12).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <i className="fas fa-hand-holding-usd text-2xl"></i>
          </div>
          <div>
            <h4 className="font-bold text-lg">Next Step: The Cancel Spree</h4>
            <p className="text-indigo-100 text-sm">
              If you cancel these {subscriptions.length} subscriptions today, you'll have an extra <strong>${(totalMonthlyWaste * 12).toFixed(2)}</strong> back in your pocket by next year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteReport;
