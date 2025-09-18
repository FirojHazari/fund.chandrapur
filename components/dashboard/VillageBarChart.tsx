
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Contribution, Village } from '../../types';
import { MOCK_VILLAGES } from '../../constants';

interface VillageBarChartProps {
  contributions: Contribution[];
}

const COLORS = ['#22d3ee', '#67e8f9', '#a5f3fc'];

const VillageBarChart: React.FC<VillageBarChartProps> = ({ contributions }) => {
  const data = useMemo(() => {
    const villageData = MOCK_VILLAGES.reduce((acc, village) => {
        acc[village] = 0;
        return acc;
    }, {} as Record<Village, number>);

    contributions.forEach(c => {
      if (villageData.hasOwnProperty(c.village)) {
        villageData[c.village] += c.amount;
      }
    });

    return Object.entries(villageData).map(([name, amount]) => ({ name, amount }));
  }, [contributions]);

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 shadow-lg shadow-cyan-500/5 h-96">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Funds per Village</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={60} />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}
            cursor={{fill: 'rgba(34, 211, 238, 0.1)'}}
          />
          <Bar dataKey="amount" fill="#22d3ee" radius={[4, 4, 0, 0]}>
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VillageBarChart;
