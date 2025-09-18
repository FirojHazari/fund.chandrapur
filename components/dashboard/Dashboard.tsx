
import React, { useState, useEffect, useMemo } from 'react';
import { Contribution, User } from '../../types';
import { getContributions } from '../../services/mockApi';
import StatCard from './StatCard';
import VillageBarChart from './VillageBarChart';
import PaymentPieChart from './PaymentPieChart';
import FundsLineChart from './FundsLineChart';
import { exportToCSV } from '../../utils/export';
import { ExportIcon } from '../shared/Icons';

interface DashboardProps {
  currentUser: User;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getContributions(currentUser);
      setContributions(data);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const totalFunds = useMemo(() => 
    contributions.reduce((sum, c) => sum + c.amount, 0),
    [contributions]
  );
  
  const totalDonors = useMemo(() => 
    new Set(contributions.map(c => c.donorName.toLowerCase())).size,
    [contributions]
  );
  
  const avgContribution = useMemo(() =>
    contributions.length > 0 ? totalFunds / contributions.length : 0,
    [contributions, totalFunds]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-300">Overview</h2>
        <button 
          onClick={() => exportToCSV(contributions, 'dashboard_report')}
          className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-cyan-400 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
          <ExportIcon className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Funds Collected" value={`₹${totalFunds.toLocaleString()}`} />
        <StatCard title="Total Contributions" value={contributions.length.toString()} />
        <StatCard title="Unique Donors" value={totalDonors.toString()} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
              <VillageBarChart contributions={contributions} />
          </div>
          <div className="lg:col-span-2">
              <PaymentPieChart contributions={contributions} />
          </div>
      </div>
       <div className="w-full">
            <FundsLineChart contributions={contributions} />
      </div>
    </div>
  );
};

export default Dashboard;
