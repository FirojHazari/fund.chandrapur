
import React from 'react';
import { User, View } from '../../types';
import { LogoutIcon, MenuIcon } from '../shared/Icons';

interface HeaderProps {
  onLogout: () => void;
  user: User;
  currentView: View;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, user, currentView, toggleSidebar }) => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 p-4 flex items-center justify-between z-10">
       <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-cyan-400 mr-4">
          <MenuIcon />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-cyan-400 tracking-wide">{currentView}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-medium text-white">{user.username}</p>
          <p className="text-xs text-cyan-400">{user.role}</p>
        </div>
        <button
          onClick={onLogout}
          className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-colors duration-200"
          aria-label="Logout"
        >
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
