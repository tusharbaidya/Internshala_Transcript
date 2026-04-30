import { TrendingUp, DollarSign, Users, Zap, GitBranch, BarChart2, Megaphone, Heart } from 'lucide-react';

const KPI_ICONS = {
  'Revenue Growth': TrendingUp,
  'Cost Efficiency': DollarSign,
  'Customer Satisfaction': Users,
  'Team Productivity': Zap,
  'Process Improvement': GitBranch,
  'Data & Insights': BarChart2,
  'Brand & Visibility': Megaphone,
  'Talent & Culture': Heart,
};

export default function KPICard({ item }) {
  const Icon = KPI_ICONS[item.kpi] || BarChart2;

  return (
    <div className="card p-4 flex gap-3 animate-slide-up">
      <div className="w-9 h-9 rounded-lg bg-ink-900 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-ink-50" />
      </div>
      <div className="min-w-0">
        <p className="font-medium text-ink-800 text-sm">{item.kpi}</p>
        <p className="text-sm text-ink-500 mt-0.5">{item.description}</p>
        {item.evidence && (
          <p className="text-xs text-ink-400 mt-1.5 font-mono italic">"{item.evidence}"</p>
        )}
      </div>
    </div>
  );
}
