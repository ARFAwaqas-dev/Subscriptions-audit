
import React from 'react';
import { AppStats } from '../types';

interface DashboardProps {
  stats: AppStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 font-medium">Monthly Total</span>
          <i className="fas fa-chart-line text-indigo-500"></i>
        </div>
        <div>
          <span className="text-3xl font-bold text-gray-900">${stats.totalMonthly.toFixed(2)}</span>
          <p className="text-xs text-gray-400 mt-1">Sum of all tracked services</p>
        </div>
      </div>

      <div className="bg-rose-50 p-6 rounded-2xl shadow-sm border border-rose-100 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-rose-700 font-medium">Estimated Monthly Waste</span>
          <i className="fas fa-fire text-rose-500"></i>
        </div>
        <div>
          <span className="text-3xl font-bold text-rose-900">${stats.estimatedWaste.toFixed(2)}</span>
          <p className="text-xs text-rose-600/70 mt-1">Based on "Rarely/Never" usage</p>
        </div>
      </div>

      <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-emerald-700 font-medium">Annual Savings Potential</span>
          <i className="fas fa-piggy-bank text-emerald-500"></i>
        </div>
        <div>
          <span className="text-3xl font-bold text-emerald-900">${stats.potentialAnnualSavings.toFixed(2)}</span>
          <p className="text-xs text-emerald-600/70 mt-1">Projected yearly recovery</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
