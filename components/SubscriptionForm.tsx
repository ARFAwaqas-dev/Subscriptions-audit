
import React, { useState } from 'react';
import { UsageFrequency, Subscription } from '../types';

interface SubscriptionFormProps {
  onAdd: (sub: Omit<Subscription, 'id' | 'isWaste'>) => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Entertainment');
  const [frequency, setFrequency] = useState<UsageFrequency>(UsageFrequency.DAILY);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    
    onAdd({
      name,
      price: parseFloat(price),
      category,
      frequency
    });

    setName('');
    setPrice('');
    // Reset frequency to default
    setFrequency(UsageFrequency.DAILY);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Netflix"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (Monthly)</label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-400">$</span>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
        >
          {['Entertainment', 'Software', 'Health', 'Utilities', 'News', 'Shopping', 'Other'].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage Frequency</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as UsageFrequency)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
        >
          {Object.values(UsageFrequency).map(freq => (
            <option key={freq} value={freq}>{freq}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2 pt-2">
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-[0.98]"
        >
          Add Subscription
        </button>
      </div>
    </form>
  );
};

export default SubscriptionForm;
