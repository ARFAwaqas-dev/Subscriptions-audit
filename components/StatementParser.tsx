
import React, { useState } from 'react';
import { analyzeStatement } from '../services/geminiService';
import { Subscription } from '../types';

interface StatementParserProps {
  onBulkAdd: (subs: Subscription[]) => void;
}

const StatementParser: React.FC<StatementParserProps> = ({ onBulkAdd }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const results = await analyzeStatement(text);
      if (results && results.length > 0) {
        onBulkAdd(results);
        setText('');
      } else {
        setError("AI couldn't find any common subscriptions in that text. Try pasting a different section of your statement.");
      }
    } catch (err) {
      setError("An error occurred while analyzing. Please check your internet connection and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="12/01 NETFLIX.COM 15.99&#10;12/05 PLANET FITNESS 22.50&#10;12/10 AMZN MKTP 14.99"
        className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm leading-relaxed"
      />
      
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-start gap-2">
          <i className="fas fa-info-circle mt-0.5"></i>
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !text.trim()}
        className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
          isAnalyzing || !text.trim() 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
        }`}
      >
        {isAnalyzing ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Analyzing with AI...
          </>
        ) : (
          <>
            <i className="fas fa-magic"></i>
            Detect Subscriptions
          </>
        )}
      </button>
      <p className="text-[10px] text-gray-400 text-center uppercase tracking-tighter font-semibold">
        Powered by Google Gemini AI
      </p>
    </div>
  );
};

export default StatementParser;
