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
    <div className="metric-card hover:shadow-lg transition-shadow duration-200 p-4 lg:p-6">
      <div className="flex justify-between items-start mb-3 lg:mb-4">
        <h3 className="text-xs lg:text-sm font-medium text-gray-600 leading-tight">{metric.title}</h3>
        <div className="ml-2 flex-shrink-0">
          {getTrendIcon()}
        </div>
      </div>
      
      <div className="flex items-baseline space-x-1 lg:space-x-2 mb-2">
        <span className={`text-xl lg:text-3xl font-bold leading-none ${getStatusColor()}`}>
          {metric.value}
        </span>
        {metric.unit && (
          <span className="text-xs lg:text-sm text-gray-500 leading-none">{metric.unit}</span>
        )}
      </div>
      
      {metric.trendValue !== undefined && (
        <div className="mt-1 lg:mt-2">
          <span className={`text-xs lg:text-sm font-medium ${
            metric.trend === 'up' ? 'text-success' : 
            metric.trend === 'down' ? 'text-warning' : 'text-gray-500'
          }`}>
            {metric.trend === 'up' ? '+' : ''}{metric.trendValue}%
          </span>
          <span className="text-xs text-gray-500 ml-1">
            <span className="hidden sm:inline">vs mes anterior</span>
            <span className="sm:hidden">vs prev.</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;