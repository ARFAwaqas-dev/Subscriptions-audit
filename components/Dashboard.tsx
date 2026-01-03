
import React, { useState } from 'react';
import { AppStats } from '../types';

interface DashboardProps {
  stats: AppStats;
  budget: number;
  onUpdateBudget: (val: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, budget, onUpdateBudget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(budget.toString());

  const isOverBudget = stats.totalMonthly > budget;
  const percentage = Math.min((stats.totalMonthly / budget) * 100, 100);

  const handleSaveBudget = () => {
    const val = parseFloat(tempBudget);
    if (!isNaN(val) && val >= 0) {
      onUpdateBudget(val);
      setIsEditing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Monthly Total & Budget Card */}
      <div className={`p-6 rounded-2xl shadow-sm border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${isOverBudget ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
        {isOverBudget && (
          <div className="absolute top-0 right-0 p-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`font-medium ${isOverBudget ? 'text-red-800' : 'text-gray-500'}`}>
              Monthly Total
            </span>
            <i className={`fas fa-chart-line ${isOverBudget ? 'text-red-600' : 'text-indigo-500'}`}></i>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-900">
              ${stats.totalMonthly.toFixed(2)}
            </span>
            <span className="text-gray-400 text-sm">/ ${budget.toFixed(0)} limit</span>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-600' : 'bg-indigo-500'}`} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            {isOverBudget && (
              <p className="text-[10px] text-red-700 font-bold uppercase tracking-wider flex items-center gap-1">
                <i className="fas fa-exclamation-circle"></i> Over budget by ${(stats.totalMonthly - budget).toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100/50">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input 
                type="number"
                value={tempBudget}
                onChange={(e) => setTempBudget(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-200 rounded outline-none focus:ring-1 focus:ring-indigo-500"
                autoFocus
                onBlur={handleSaveBudget}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveBudget()}
              />
              <button onClick={handleSaveBudget} className="text-xs font-bold text-indigo-600 hover:text-indigo-800">SAVE</button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 flex items-center gap-1"
            >
              <i className="fas fa-cog"></i> SET BUDGET
            </button>
          )}
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
