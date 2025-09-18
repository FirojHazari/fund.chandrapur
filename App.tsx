
import React, { useState, useEffect, useCallback } from 'react';
import { User, Role, View } from './types';
import { MOCK_USERS } from './constants';
import Login from './components/auth/Login';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import ContributionManager from './components/management/ContributionManager';
import MentorManager from './components/management/MentorManager';
import LocalityManager from './components/management/LocalityManager';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (username: string, password?: string): boolean => {
    const user = MOCK_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      return false;
    }

    if (user.role === Role.ADMIN) {
      if (user.username === 'Firoj' && password === 'Firoj#786') {
        setCurrentUser(user);
        return true;
      }
      return false;
    }
    
    // For other users, no password check
    setCurrentUser(user);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView(View.DASHBOARD);
  };

  const renderView = () => {
    if (!currentUser) return null;
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard currentUser={currentUser} />;
      case View.CONTRIBUTIONS:
        return <ContributionManager currentUser={currentUser} />;
      case View.MENTORS:
        return <MentorManager currentUser={currentUser} />;
      case View.LOCALITIES:
        return <LocalityManager currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-gray-200 font-sans">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        currentUser={currentUser}
      />
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64">
        <Header 
          onLogout={handleLogout} 
          user={currentUser} 
          currentView={currentView}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;