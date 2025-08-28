import React from 'react';
import MetricCard from '../common/MetricCard';
import { kpiMetrics, activeRoutes, operationalAlerts } from '../../data/mockData';
import { AlertCircle, CheckCircle, Clock, Truck } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ExecutiveDashboard: React.FC = () => {
  // Sample data for charts
  const revenueData = [
    { month: 'Ene', ingresos: 10.2, costos: 7.8 },
    { month: 'Feb', ingresos: 10.8, costos: 8.1 },
    { month: 'Mar', ingresos: 11.5, costos: 8.4 },
    { month: 'Abr', ingresos: 11.9, costos: 8.6 },
    { month: 'May', ingresos: 12.4, costos: 8.9 },
  ];

  const fleetUtilization = [
    { name: 'En Ruta', value: 68, color: '#059669' },
    { name: 'Disponible', value: 12, color: '#3b82f6' },
    { name: 'Mantenimiento', value: 8, color: '#d97706' },
    { name: 'Fuera de Servicio', value: 12, color: '#6b7280' },
  ];

  const routePerformance = [
    { route: 'QRO-NLD', onTime: 95, delayed: 5 },
    { route: 'GTO-TIJ', onTime: 92, delayed: 8 },
    { route: 'QRO-MZO', onTime: 98, delayed: 2 },
    { route: 'GTO-CDMX', onTime: 94, delayed: 6 },
    { route: 'VER-QRO', onTime: 91, delayed: 9 },
  ];

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'medium':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
        {kpiMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4">Ingresos vs Costos Operativos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ingresos" stroke="#059669" strokeWidth={3} name="Ingresos (M MXN)" />
              <Line type="monotone" dataKey="costos" stroke="#d97706" strokeWidth={3} name="Costos (M MXN)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fleet Utilization */}
        <div className="card">
          <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4">Utilización de Flota</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={fleetUtilization}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {fleetUtilization.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Performance */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Rendimiento por Ruta</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={routePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="route" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" fill="#059669" name="A Tiempo (%)" />
              <Bar dataKey="delayed" fill="#d97706" name="Retrasado (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Operational Alerts */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Alertas Operativas</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {operationalAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  alert.acknowledged ? 'bg-gray-50 border-gray-200' : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.severity)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(alert.timestamp).toLocaleString('es-MX')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Routes Summary */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Rutas Activas</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Truck className="w-4 h-4" />
            <span>{activeRoutes.filter(r => r.status === 'active').length} en tránsito</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-700">Ruta</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Cliente</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Estado</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">ETA</th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">Optimización</th>
              </tr>
            </thead>
            <tbody>
              {activeRoutes.map((route) => (
                <tr key={route.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm">
                    {route.origin.name} → {route.destination.name}
                  </td>
                  <td className="py-3 text-sm">{route.cargo?.client || 'N/A'}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      route.status === 'active' ? 'bg-green-100 text-green-800' :
                      route.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      route.status === 'delayed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {route.status === 'active' ? 'En Ruta' :
                       route.status === 'planned' ? 'Planificada' :
                       route.status === 'delayed' ? 'Retrasada' : 'Completada'}
                    </span>
                  </td>
                  <td className="py-3 text-sm">{route.estimatedTime}h</td>
                  <td className="py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-success h-2 rounded-full"
                          style={{ width: `${route.optimizationScore || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{route.optimizationScore}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;