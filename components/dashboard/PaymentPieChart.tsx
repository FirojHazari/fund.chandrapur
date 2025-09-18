
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Contribution, PaymentType } from '../../types';

interface PaymentPieChartProps {
  contributions: Contribution[];
}

const COLORS = {
  [PaymentType.CASH]: '#06b6d4',
  [PaymentType.ONLINE]: '#67e8f9',
  [PaymentType.OTHER]: '#a5f3fc',
};

const PaymentPieChart: React.FC<PaymentPieChartProps> = ({ contributions }) => {
  const data = useMemo(() => {
    const paymentData = {
        [PaymentType.CASH]: 0,
        [PaymentType.ONLINE]: 0,
        [PaymentType.OTHER]: 0,
    };

    contributions.forEach(c => {
        paymentData[c.paymentType] += c.amount;
    });

    return Object.entries(paymentData).map(([name, value]) => ({ name, value })).filter(d => d.value > 0);
  }, [contributions]);

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 shadow-lg shadow-cyan-500/5 h-96">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Payment Type Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}
            cursor={{fill: 'rgba(34, 211, 238, 0.1)'}}
          />
          <Legend iconType="circle" />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name as PaymentType]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentPieChart;
