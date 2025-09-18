
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 shadow-lg shadow-cyan-500/5 hover:scale-[1.02] transition-transform duration-300">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <p className="text-3xl font-bold text-cyan-400 mt-2">{value}</p>
    </div>
  );
};

export default StatCard;
