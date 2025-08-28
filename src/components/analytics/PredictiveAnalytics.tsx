import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const PredictiveAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('3months');
  const [analysisType, setAnalysisType] = useState('demand');

  // Mock demand forecast data
  const demandForecastData = [
    { month: 'Jun 2024', historical: 245, predicted: 250, confidence: 92, upperBound: 275, lowerBound: 225 },
    { month: 'Jul 2024', historical: 280, predicted: 295, confidence: 89, upperBound: 320, lowerBound: 270 },
    { month: 'Aug 2024', historical: 310, predicted: 325, confidence: 85, upperBound: 355, lowerBound: 295 },
    { month: 'Sep 2024', historical: null, predicted: 340, confidence: 82, upperBound: 375, lowerBound: 305 },
    { month: 'Oct 2024', historical: null, predicted: 365, confidence: 78, upperBound: 405, lowerBound: 325 },
    { month: 'Nov 2024', historical: null, predicted: 385, confidence: 75, upperBound: 430, lowerBound: 340 },
  ];

  // Seasonal trends by automotive client
  const seasonalTrends = [
    { client: 'BMW', q1: 85, q2: 120, q3: 95, q4: 140 },
    { client: 'Tesla', q1: 110, q2: 95, q3: 130, q4: 165 },
    { client: 'Nissan', q1: 75, q2: 100, q3: 85, q4: 120 },
    { client: 'VW', q1: 90, q2: 115, q3: 105, q4: 135 },
  ];

  // Capacity recommendations
  const capacityData = [
    { resource: 'Vehículos Estándar', current: 65, recommended: 78, utilization: 87 },
    { resource: 'Vehículos Sobredimensionados', current: 15, recommended: 18, utilization: 92 },
    { resource: 'Operadores Certificados', current: 88, recommended: 95, utilization: 89 },
    { resource: 'Espacio Almacén (m³)', current: 12500, recommended: 14200, utilization: 85 },
  ];

  // Market intelligence data
  const marketTrends = [
    { indicator: 'Producción Automotriz México', value: '+8.5%', trend: 'up', impact: 'high' },
    { indicator: 'Exportaciones a EE.UU.', value: '+12.3%', trend: 'up', impact: 'high' },
    { indicator: 'Nuevos Modelos Eléctricos', value: '+25%', trend: 'up', impact: 'medium' },
    { indicator: 'Costos Combustible', value: '-3.2%', trend: 'down', impact: 'medium' },
    { indicator: 'Regulaciones Ambientales', value: 'Nuevas', trend: 'neutral', impact: 'low' },
  ];

  // Risk factors
  const riskFactors = [
    { factor: 'Volatilidad Tipo de Cambio', probability: 'Alta', impact: 'Medio', mitigation: 'Cobertura financiera' },
    { factor: 'Escasez Semiconductores', probability: 'Media', impact: 'Alto', mitigation: 'Diversificación proveedores' },
    { factor: 'Cambios Regulatorios', probability: 'Media', impact: 'Medio', mitigation: 'Monitoreo continuo' },
    { factor: 'Competencia Nearshoring', probability: 'Alta', impact: 'Alto', mitigation: 'Diferenciación servicio' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Suite de Análisis Predictivo</h2>
              <p className="text-gray-600">Pronósticos inteligentes para la industria automotriz</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={analysisType}
              onChange={(e) => setAnalysisType(e.target.value)}
            >
              <option value="demand">Demanda</option>
              <option value="capacity">Capacidad</option>
              <option value="market">Mercado</option>
              <option value="risks">Riesgos</option>
            </select>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="1month">1 Mes</option>
              <option value="3months">3 Meses</option>
              <option value="6months">6 Meses</option>
              <option value="1year">1 Año</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">87%</div>
            <div className="text-sm text-gray-600">Precisión Pronósticos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+15%</div>
            <div className="text-sm text-gray-600">Crecimiento Previsto</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">92%</div>
            <div className="text-sm text-gray-600">Utilización Óptima</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-600">Riesgos Identificados</div>
          </div>
        </div>
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand Forecast Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
            Pronóstico de Demanda
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={demandForecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="upperBound" stackId="1" stroke="#e5e7eb" fill="#e5e7eb" name="Banda Superior" />
              <Area type="monotone" dataKey="lowerBound" stackId="1" stroke="#e5e7eb" fill="#ffffff" name="Banda Inferior" />
              <Line type="monotone" dataKey="historical" stroke="#6b7280" strokeWidth={2} name="Histórico" dot={{ fill: '#6b7280' }} />
              <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={3} name="Predicción" strokeDasharray="5,5" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-800">
              <strong>Insight:</strong> Se prevé un crecimiento del 15% en la demanda para Q4 2024, 
              principalmente impulsado por el lanzamiento de nuevos modelos eléctricos.
            </div>
          </div>
        </div>

        {/* Seasonal Trends */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Tendencias Estacionales por Cliente
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={seasonalTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="client" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="q1" fill="#3b82f6" name="Q1" />
              <Bar dataKey="q2" fill="#10b981" name="Q2" />
              <Bar dataKey="q3" fill="#f59e0b" name="Q3" />
              <Bar dataKey="q4" fill="#ef4444" name="Q4" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800">
              <strong>Patrón:</strong> Tesla y BMW muestran mayor demanda en Q4, 
              alineado con ciclos de producción de fin de año.
            </div>
          </div>
        </div>
      </div>

      {/* Capacity Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
          Recomendaciones de Capacidad
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-700">Recurso</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Actual</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Recomendado</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Utilización</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Acción</th>
              </tr>
            </thead>
            <tbody>
              {capacityData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-sm font-medium">{item.resource}</td>
                  <td className="py-3 text-sm">{item.current.toLocaleString()}</td>
                  <td className="py-3 text-sm font-medium text-green-600">
                    {item.recommended.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.utilization > 90 ? 'bg-red-500' :
                            item.utilization > 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(item.utilization, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm">{item.utilization}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    {item.utilization > 90 ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Ampliar Urgente
                      </span>
                    ) : item.utilization > 80 ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Planificar Expansión
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Capacidad Adecuada
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Intelligence and Risk Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Trends */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-indigo-600" />
            Inteligencia de Mercado
          </h3>
          <div className="space-y-3">
            {marketTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{trend.indicator}</div>
                  <div className={`text-xs ${getImpactColor(trend.impact)}`}>
                    Impacto: {trend.impact}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(trend.trend)}
                  <span className="font-bold text-lg">{trend.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
            Evaluación de Riesgos
          </h3>
          <div className="space-y-3">
            {riskFactors.map((risk, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{risk.factor}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      risk.probability === 'Alta' ? 'bg-red-100 text-red-800' :
                      risk.probability === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {risk.probability}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      risk.impact === 'Alto' ? 'bg-red-100 text-red-800' :
                      risk.impact === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {risk.impact}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  <span className="font-medium">Mitigación:</span> {risk.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Model Performance */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          Rendimiento de Modelos IA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">94.2%</div>
            <div className="text-sm text-gray-600 mb-2">Precisión Demanda</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94.2%' }} />
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">87.8%</div>
            <div className="text-sm text-gray-600 mb-2">Precisión Estacional</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '87.8%' }} />
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">91.5%</div>
            <div className="text-sm text-gray-600 mb-2">Detección Riesgos</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91.5%' }} />
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">89.1%</div>
            <div className="text-sm text-gray-600 mb-2">Optimización Capacidad</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '89.1%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;