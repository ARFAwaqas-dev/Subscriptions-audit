
import React, { useState, useMemo, useEffect } from 'react';
import { Subscription, UsageFrequency } from './types';
import Dashboard from './components/Dashboard';
import SubscriptionForm from './components/SubscriptionForm';
import SubscriptionList from './components/SubscriptionList';
import StatementParser from './components/StatementParser';
import WasteReport from './components/WasteReport';

const App: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'waste' | 'add'>('all');
  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem('subaudit_budget');
    return saved ? parseFloat(saved) : 100;
  });

  // Persist budget to localStorage
  useEffect(() => {
    localStorage.setItem('subaudit_budget', budget.toString());
  }, [budget]);

  const stats = useMemo(() => {
    const totalMonthly = subscriptions.reduce((sum, s) => sum + s.price, 0);
    const wasteList = subscriptions.filter(s => s.frequency === UsageFrequency.RARELY || s.frequency === UsageFrequency.NEVER);
    const estimatedWaste = wasteList.reduce((sum, s) => sum + s.price, 0);
    
    return {
      totalMonthly,
      estimatedWaste: estimatedWaste === 0 && subscriptions.length === 0 ? 17 : estimatedWaste,
      potentialAnnualSavings: estimatedWaste * 12
    };
  }, [subscriptions]);

  const addSubscription = (sub: Omit<Subscription, 'id' | 'isWaste'>) => {
    const isWaste = sub.frequency === UsageFrequency.RARELY || sub.frequency === UsageFrequency.NEVER;
    setSubscriptions([...subscriptions, { ...sub, id: Date.now().toString(), isWaste }]);
  };

  const removeSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };

  const updateFrequency = (id: string, freq: UsageFrequency) => {
    setSubscriptions(subscriptions.map(s => 
      s.id === id ? { ...s, frequency: freq, isWaste: freq === UsageFrequency.RARELY || freq === UsageFrequency.NEVER } : s
    ));
  };

  const handleBulkAdd = (subs: Subscription[]) => {
    setSubscriptions([...subscriptions, ...subs]);
    setActiveTab('all');
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-6 px-4 md:px-8 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fas fa-wallet text-2xl"></i>
            <h1 className="text-2xl font-bold tracking-tight">SubAudit</h1>
          </div>
          <p className="hidden md:block text-indigo-100 italic">Stop bleeding money on unused services.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* Dashboard Section */}
        <Dashboard stats={stats} budget={budget} onUpdateBudget={setBudget} />

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-400'}`}
          >
            My Subscriptions ({subscriptions.length})
          </button>
          <button 
            onClick={() => setActiveTab('waste')}
            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'waste' ? 'text-rose-600 border-b-2 border-rose-600' : 'text-gray-500 hover:text-rose-400'}`}
          >
            Waste Analysis
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`px-6 py-3 font-medium transition-colors ${activeTab === 'add' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-400'}`}
          >
            + Add New
          </button>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'all' && (
              <SubscriptionList 
                subscriptions={subscriptions} 
                onRemove={removeSubscription} 
                onUpdateFrequency={updateFrequency}
              />
            )}
            {activeTab === 'waste' && (
              <WasteReport subscriptions={subscriptions.filter(s => s.isWaste)} />
            )}
            {activeTab === 'add' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Manual Entry</h2>
                  <SubscriptionForm onAdd={addSubscription} />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">AI Statement Parser</h2>
                  <p className="text-sm text-gray-500 mb-4">Paste your bank statement text and let AI identify subscriptions automatically.</p>
                  <StatementParser onBulkAdd={handleBulkAdd} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Tips */}
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
              <h3 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
                <i className="fas fa-lightbulb"></i> Pro Saving Tip
              </h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                Most Americans waste <strong>$200+ per year</strong> on services they forgot to cancel after a "free trial". 
                Sort your list by "Rarely" or "Never" to find your biggest savings opportunities.
              </p>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl">
              <h3 className="text-indigo-800 font-bold mb-2">Common Subscriptions</h3>
              <div className="flex flex-wrap gap-2">
                {['Netflix', 'Hulu', 'Amazon Prime', 'Spotify', 'Disney+', 'Gym', 'NYT', 'Adobe'].map(item => (
                  <span key={item} className="px-2 py-1 bg-white border border-indigo-200 text-indigo-700 text-xs rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-400 text-sm py-8 border-t border-gray-100">
        &copy; {new Date().getFullYear()} SubAudit Tool. All rights reserved. Built for American consumers.
      </footer>
    </div>
  );
};

export default App;
