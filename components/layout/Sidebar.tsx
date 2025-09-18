
import React from 'react';
import { User, View, Role } from '../../types';
import { DashboardIcon, ContributionIcon, MentorIcon, LocalityIcon, CloseIcon } from '../shared/Icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentUser: User;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: View;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-cyan-500/10 text-cyan-400 shadow-inner'
        : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen, currentUser }) => {
  const handleNavClick = (view: View) => {
    setCurrentView(view);
    if(window.innerWidth < 768) { // md breakpoint
        setIsOpen(false);
    }
  };

  const navItems = [
    { view: View.DASHBOARD, icon: <DashboardIcon />, label: View.DASHBOARD },
    { view: View.CONTRIBUTIONS, icon: <ContributionIcon />, label: View.CONTRIBUTIONS },
    { view: View.MENTORS, icon: <MentorIcon />, label: View.MENTORS },
    { view: View.LOCALITIES, icon: <LocalityIcon />, label: View.LOCALITIES, roles: [Role.CORE, Role.ADMIN] },
  ];

  return (
    <>
      <aside className={`fixed top-0 left-0 w-64 h-full bg-slate-800/80 backdrop-blur-sm border-r border-slate-700/50 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700/50">
          <h1 className="text-xl font-bold text-cyan-400 tracking-wider">NEXUS</h1>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-cyan-400">
             <CloseIcon/>
          </button>
        </div>
        <nav className="p-4 space-y-2">
            {navItems.map((item) => 
                (!item.roles || item.roles.includes(currentUser.role)) && (
                    <NavLink
                        key={item.view}
                        icon={item.icon}
                        label={item.label}
                        isActive={currentView === item.view}
                        onClick={() => handleNavClick(item.view)}
                    />
                )
            )}
        </nav>
      </aside>
       {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 z-30 md:hidden"></div>}
    </>
  );
};

export default Sidebar;