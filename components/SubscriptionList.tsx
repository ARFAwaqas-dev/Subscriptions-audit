
import React from 'react';
import { Subscription, UsageFrequency } from '../types';

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onRemove: (id: string) => void;
  onUpdateFrequency: (id: string, freq: UsageFrequency) => void;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions, onRemove, onUpdateFrequency }) => {
  if (subscriptions.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-list-ul text-gray-300 text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">No subscriptions tracked yet</h3>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">Add your monthly services manually or use the AI parser to start auditing your expenses.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Service</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className={`hover:bg-gray-50 transition-colors ${sub.isWaste ? 'bg-rose-50/30' : ''}`}>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-800">{sub.name}</div>
                  <div className="text-xs text-gray-400">{sub.category}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-medium text-gray-700">${sub.price.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={sub.frequency}
                    onChange={(e) => onUpdateFrequency(sub.id, e.target.value as UsageFrequency)}
                    className={`text-sm px-2 py-1 rounded-md border-0 bg-transparent focus:ring-2 focus:ring-indigo-500 ${sub.isWaste ? 'text-rose-600 font-bold' : 'text-gray-600'}`}
                  >
                    {Object.values(UsageFrequency).map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onRemove(sub.id)}
                    className="text-gray-300 hover:text-rose-500 transition-colors p-2"
                    title="Remove subscription"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionList;
