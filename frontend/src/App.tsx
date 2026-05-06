import React, { useState } from 'react';
import { Home, MessageSquare, PieChart, User, Settings, Menu, X, Leaf } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ChatAssistant from './pages/ChatAssistant';
import Profile from './pages/Profile';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'AI Assistant' },
    { id: 'tracker', icon: PieChart, label: 'Nutrition' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col transition-all duration-300 z-50"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white">
            <Leaf size={24} />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-xl tracking-tight text-slate-800">NutriNexus</span>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon size={22} />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-4 flex items-center justify-center text-slate-400 hover:text-slate-600 border-t border-slate-100"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <Dashboard key="dashboard" />}
          {activeTab === 'chat' && <ChatAssistant key="chat" />}
          {activeTab === 'profile' && <Profile key="profile" />}
          {/* Add more pages as needed */}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
