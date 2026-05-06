import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Shield, Target } from 'lucide-react';
import { createProfile } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    userId: 'user_123',
    name: 'Nik',
    age: 28,
    goal: 'weight loss',
    dietaryPreference: 'any',
    healthConditions: ['Diabetes'],
    activityLevel: 'active'
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await createProfile(profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8 pb-12"
    >
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Your Health Profile</h1>
        <p className="text-slate-500 mt-1">This helps our AI personalize your meal recommendations.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Personal Info */}
        <section className="card space-y-6">
          <div className="flex items-center gap-2 text-primary-700 font-bold">
            <User size={20} /> Personal Information
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Age</label>
              <input 
                type="number" 
                value={profile.age}
                onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Goals & Activity */}
        <section className="card space-y-6">
          <div className="flex items-center gap-2 text-primary-700 font-bold">
            <Target size={20} /> Goals & Activity
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Primary Goal</label>
              <select 
                value={profile.goal}
                onChange={(e) => setProfile({...profile, goal: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              >
                <option value="weight loss">Weight Loss</option>
                <option value="muscle gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Activity Level</label>
              <select 
                value={profile.activityLevel}
                onChange={(e) => setProfile({...profile, activityLevel: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              >
                <option value="sedentary">Sedentary (Little to no exercise)</option>
                <option value="active">Active (1-3 days/week)</option>
                <option value="very active">Very Active (4-7 days/week)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Health Conditions */}
        <section className="card space-y-6">
          <div className="flex items-center gap-2 text-primary-700 font-bold">
            <Shield size={20} /> Health Conditions
          </div>
          <div className="flex flex-wrap gap-2">
            {['Diabetes', 'High Blood Pressure', 'Gluten Intolerance', 'Nut Allergy'].map(condition => (
              <button
                key={condition}
                onClick={() => {
                  const current = profile.healthConditions;
                  if (current.includes(condition)) {
                    setProfile({...profile, healthConditions: current.filter(c => c !== condition)});
                  } else {
                    setProfile({...profile, healthConditions: [...current, condition]});
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  profile.healthConditions.includes(condition)
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </section>

        <button 
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg shadow-xl"
        >
          {saving ? 'Saving...' : <><Save size={24} /> Save Profile</>}
        </button>
      </div>
    </motion.div>
  );
};

export default Profile;
