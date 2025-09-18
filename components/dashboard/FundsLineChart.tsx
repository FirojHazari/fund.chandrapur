
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Contribution } from '../../types';

interface FundsLineChartProps {
  contributions: Contribution[];
}

const FundsLineChart: React.FC<FundsLineChartProps> = ({ contributions }) => {
  const data = useMemo(() => {
    const sortedContributions = [...contributions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const dailyTotals: { [key: string]: number } = {};
    sortedContributions.forEach(c => {
      dailyTotals[c.date] = (dailyTotals[c.date] || 0) + c.amount;
    });

    const cumulativeData: { date: string; amount: number }[] = [];
    let cumulativeAmount = 0;
    Object.keys(dailyTotals).sort().forEach(date => {
      cumulativeAmount += dailyTotals[date];
      cumulativeData.push({ date, amount: cumulativeAmount });
    });

    return cumulativeData;
  }, [contributions]);

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 shadow-lg shadow-cyan-500/5 h-96">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Cumulative Fund Growth</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8" 
            tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Area type="monotone" dataKey="amount" stroke="#22d3ee" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundsLineChart;
