import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import type { KPIMetric } from '../../types';

interface MetricCardProps {
  metric: KPIMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-success" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-warning" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (metric.status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'danger':
        return 'text-red-600';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="metric-card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
        {getTrendIcon()}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className={`text-3xl font-bold ${getStatusColor()}`}>
          {metric.value}
        </span>
        {metric.unit && (
          <span className="text-sm text-gray-500">{metric.unit}</span>
        )}
      </div>
      
      {metric.trendValue !== undefined && (
        <div className="mt-2">
          <span className={`text-sm font-medium ${
            metric.trend === 'up' ? 'text-success' : 
            metric.trend === 'down' ? 'text-warning' : 'text-gray-500'
          }`}>
            {metric.trend === 'up' ? '+' : ''}{metric.trendValue}%
          </span>
          <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;