import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Target, AlertCircle, PlusCircle } from 'lucide-react';
import { getRecommendation } from '../services/api';

const Dashboard = () => {
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user ID for demo
    fetchRecommendation();
  }, []);

  const fetchRecommendation = async () => {
    setLoading(true);
    try {
      // In production, get actual userId from Auth
      const data = await getRecommendation('user_123');
      setRecommendation(data);
    } catch (error) {
      console.error('Failed to fetch recommendation', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Good Afternoon, Nik!</h1>
          <p className="text-slate-500 mt-1">Eat Smart. Live Better.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <PlusCircle size={20} /> Log Meal
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Target size={24} /></div>
          <div>
            <p className="text-sm text-slate-500">Daily Goal</p>
            <p className="text-xl font-bold">2,400 kcal</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Zap size={24} /></div>
          <div>
            <p className="text-sm text-slate-500">Consumed</p>
            <p className="text-xl font-bold">1,250 kcal</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Clock size={24} /></div>
          <div>
            <p className="text-sm text-slate-500">Remaining</p>
            <p className="text-xl font-bold">1,150 kcal</p>
          </div>
        </div>
      </div>

      {/* Smart Suggestion */}
      <div className="card relative overflow-hidden bg-primary-900 text-white border-0 shadow-xl p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary-200 mb-4 font-medium uppercase tracking-wider text-sm">
            <Zap size={16} /> Smart Meal Suggestion
          </div>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-white/20 rounded w-2/3"></div>
              <div className="h-4 bg-white/10 rounded w-full"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight">
                {recommendation?.recommendation.split('.')[0]}.
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl">
                {recommendation?.recommendation.split('.').slice(1).join('.')}
              </p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                {recommendation?.alternatives?.map((alt: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20">
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 blur-3xl -mr-20 -mt-20 rounded-full"></div>
      </div>

      {/* Health Pattern Warning (Mock Adaptive Logic) */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4 items-start shadow-sm">
        <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
          <AlertCircle size={20} />
        </div>
        <div>
          <h3 className="font-bold text-amber-900">Pattern Detected</h3>
          <p className="text-amber-800 text-sm mt-1">
            You've skipped breakfast twice this week. This might lead to overeating at dinner. 
            Try a small protein-rich snack now to stabilize your metabolism.
          </p>
          <button className="text-amber-900 font-semibold text-sm mt-3 underline">View Fix Suggestion</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
