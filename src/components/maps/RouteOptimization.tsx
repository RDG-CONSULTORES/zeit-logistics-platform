import React, { useState } from 'react';
import { zeitLocations, activeRoutes } from '../../data/mockData';
import { Route, Clock, DollarSign, Fuel, TrendingDown } from 'lucide-react';

const RouteOptimization: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [optimizationLevel, setOptimizationLevel] = useState('balanced');

  // Mock optimization data
  const optimizationMetrics = {
    totalSavings: 18.5,
    timeSaved: 22,
    fuelReduction: 15.2,
    carbonReduction: 12.8,
    costsAvoided: 450000
  };

  const selectedRouteData = activeRoutes.find(r => r.id === selectedRoute);

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'headquarters': return 'bg-blue-600';
      case 'port': return 'bg-green-600';
      case 'border': return 'bg-orange-600';
      case 'warehouse': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Optimization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="metric-card text-center">
          <DollarSign className="w-6 h-6 text-success mx-auto mb-2" />
          <div className="text-2xl font-bold text-success">{optimizationMetrics.totalSavings}%</div>
          <div className="text-sm text-gray-600">Ahorro Total</div>
        </div>
        <div className="metric-card text-center">
          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">{optimizationMetrics.timeSaved}%</div>
          <div className="text-sm text-gray-600">Tiempo Ahorrado</div>
        </div>
        <div className="metric-card text-center">
          <Fuel className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">{optimizationMetrics.fuelReduction}%</div>
          <div className="text-sm text-gray-600">Reducción Combustible</div>
        </div>
        <div className="metric-card text-center">
          <TrendingDown className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{optimizationMetrics.carbonReduction}%</div>
          <div className="text-sm text-gray-600">Reducción CO₂</div>
        </div>
        <div className="metric-card text-center">
          <DollarSign className="w-6 h-6 text-success mx-auto mb-2" />
          <div className="text-lg font-bold text-success">${optimizationMetrics.costsAvoided.toLocaleString()}</div>
          <div className="text-sm text-gray-600">MXN Ahorrados/Mes</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geographic Map View */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Mapa de Rutas Zeit</h3>
            <div className="flex items-center space-x-2">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                value={optimizationLevel}
                onChange={(e) => setOptimizationLevel(e.target.value)}
              >
                <option value="fastest">Más Rápida</option>
                <option value="cheapest">Más Económica</option>
                <option value="balanced">Balanceada</option>
                <option value="eco-friendly">Eco-Amigable</option>
              </select>
            </div>
          </div>

          {/* Simplified Map Representation */}
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8" style={{ height: '500px' }}>
            {/* Geographic locations */}
            {zeitLocations.map((location, index) => {
              const positions = [
                { x: 45, y: 60 }, // Querétaro
                { x: 40, y: 65 }, // GTO
                { x: 55, y: 25 }, // Nuevo Laredo
                { x: 15, y: 30 }, // Tijuana
                { x: 35, y: 85 }, // Manzanillo
                { x: 75, y: 75 }, // Veracruz
                { x: 50, y: 70 }, // CDMX
              ];
              const position = positions[index] || { x: 50, y: 50 };

              return (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                >
                  <div className={`w-4 h-4 ${getLocationColor(location.type)} rounded-full shadow-lg`} />
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 text-center whitespace-nowrap">
                    <div className="bg-white px-2 py-1 rounded shadow border">
                      {location.name}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Route Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {activeRoutes.map((route) => (
                <g key={route.id}>
                  <line
                    x1={`${45}%`}
                    y1={`${60}%`}
                    x2={`${55}%`}
                    y2={`${25}%`}
                    stroke={route.status === 'active' ? '#10b981' : '#6b7280'}
                    strokeWidth="3"
                    strokeDasharray={route.status === 'planned' ? '5,5' : 'none'}
                    className="cursor-pointer hover:stroke-blue-500"
                    onClick={() => setSelectedRoute(route.id)}
                  />
                  {/* Route optimization score indicator */}
                  <circle
                    cx={`${50}%`}
                    cy={`${42.5}%`}
                    r="8"
                    fill={route.optimizationScore && route.optimizationScore > 90 ? '#10b981' : '#f59e0b'}
                    className="cursor-pointer"
                    onClick={() => setSelectedRoute(route.id)}
                  />
                  <text
                    x={`${50}%`}
                    y={`${45}%`}
                    textAnchor="middle"
                    className="text-xs fill-white font-bold"
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    {route.optimizationScore}
                  </text>
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow border">
              <h4 className="text-sm font-semibold mb-2">Leyenda</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Sede Central</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Puerto</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <span>Frontera</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span>Almacén</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Details & Optimization */}
        <div className="space-y-6">
          {/* Route Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Optimización de Rutas</h3>
            <div className="space-y-3">
              {activeRoutes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedRoute === route.id
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">
                      {route.origin.name} → {route.destination.name}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      route.status === 'active' ? 'bg-green-100 text-green-700' :
                      route.status === 'planned' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {route.status === 'active' ? 'Activa' : route.status === 'planned' ? 'Planificada' : 'Retrasada'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {route.distance}km • {route.estimatedTime}h • Opt: {route.optimizationScore}%
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Route Details */}
          {selectedRouteData && (
            <div className="card">
              <h4 className="font-semibold text-gray-800 mb-3">Detalles de Ruta</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Origen - Destino</div>
                  <div className="font-medium">{selectedRouteData.origin.name} → {selectedRouteData.destination.name}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm text-gray-600">Distancia</div>
                    <div className="font-medium">{selectedRouteData.distance} km</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Tiempo Est.</div>
                    <div className="font-medium">{selectedRouteData.estimatedTime}h</div>
                  </div>
                </div>

                {selectedRouteData.cargo && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Carga</div>
                    <div className="font-medium text-sm">{selectedRouteData.cargo.description}</div>
                    <div className="text-xs text-gray-500">
                      Cliente: {selectedRouteData.cargo.client} • {selectedRouteData.cargo.weight}kg
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-gray-600 mb-2">Score de Optimización</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full"
                        style={{ width: `${selectedRouteData.optimizationScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{selectedRouteData.optimizationScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Integration Status */}
          <div className="card">
            <h4 className="font-semibold text-gray-800 mb-3">Integración IA</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Análisis de Tráfico</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Activo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Predicción Meteorológica</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Activo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Optimización Combustible</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Beta</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Análisis Aduanal</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Desarrollo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recomendaciones de Optimización</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <Route className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-semibold text-blue-900 mb-2">Ruta Querétaro-Nuevo Laredo</h4>
            <p className="text-sm text-blue-700 mb-2">Desvío por autopista 57D puede ahorrar 45 minutos</p>
            <div className="text-xs text-blue-600 font-medium">Ahorro estimado: $1,200 MXN</div>
          </div>
          
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <Clock className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-900 mb-2">Horario Optimizado</h4>
            <p className="text-sm text-green-700 mb-2">Salida a las 4:00 AM evita tráfico en zona metropolitana</p>
            <div className="text-xs text-green-600 font-medium">Ahorro estimado: 1.2 horas</div>
          </div>
          
          <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
            <Fuel className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-semibold text-orange-900 mb-2">Eficiencia Combustible</h4>
            <p className="text-sm text-orange-700 mb-2">Velocidad constante de 85 km/h maximiza eficiencia</p>
            <div className="text-xs text-orange-600 font-medium">Reducción: 12% combustible</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;