import React, { useState } from 'react';
import { fleetVehicles, operationalAlerts, activeRoutes } from '../../data/mockData';
import { Radio, Truck, MapPin, AlertTriangle, Activity, Shield, Wifi, Battery, Navigation } from 'lucide-react';

const OperationsControlTower: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [alertFilter, setAlertFilter] = useState('all');
  const [monitoringMode, setMonitoringMode] = useState('real-time');

  // Mock real-time operations data
  const operationsStatus = {
    activeVehicles: 68,
    totalFleet: 88,
    onTimeDeliveries: 94.6,
    averageSpeed: 78.5,
    fuelEfficiency: 92.3,
    securityIncidents: 0
  };

  // Mock vehicle telemetry data
  const telemetryData = selectedVehicle ? {
    location: { lat: 20.5888, lng: -100.3899 },
    speed: 82,
    fuel: 78,
    engine: 'Normal',
    temperature: 89,
    lastUpdate: new Date(),
    driver: 'Carlos Mendoza',
    route: 'QRO-NLD-001',
    eta: '14:30',
    cargo: 'Componentes BMW - 24,000 kg'
  } : null;

  // Mock incident response protocols
  const responseProtocols = [
    { type: 'Retraso Mayor (>2h)', severity: 'high', actions: ['Notificar cliente', 'Reasignar recursos', 'Activar plan B'] },
    { type: 'Falla Mecánica', severity: 'critical', actions: ['Enviar asistencia', 'Reubicar carga', 'Contactar seguro'] },
    { type: 'Clima Adverso', severity: 'medium', actions: ['Evaluar ruta', 'Reducir velocidad', 'Monitorear continuo'] },
    { type: 'Alerta Seguridad', severity: 'critical', actions: ['Contactar autoridades', 'Parar vehículo', 'Activar GPS tracking'] }
  ];

  const getVehicleStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleIcon = (status: string) => {
    switch (status) {
      case 'in-transit': return <Navigation className="w-4 h-4 text-green-600" />;
      case 'available': return <Truck className="w-4 h-4 text-blue-600" />;
      case 'maintenance': return <Activity className="w-4 h-4 text-yellow-600" />;
      case 'offline': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Truck className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const filteredAlerts = alertFilter === 'all' 
    ? operationalAlerts 
    : operationalAlerts.filter(alert => alert.severity === alertFilter);

  return (
    <div className="space-y-6">
      {/* Control Tower Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Torre de Control Operativo</h2>
              <p className="text-gray-600">Monitoreo y supervisión en tiempo real 24/7</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Sistema Activo</span>
            </div>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={monitoringMode}
              onChange={(e) => setMonitoringMode(e.target.value)}
            >
              <option value="real-time">Tiempo Real</option>
              <option value="historical">Histórico</option>
              <option value="predictive">Predictivo</option>
            </select>
          </div>
        </div>

        {/* Operations Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="metric-card text-center">
            <div className="flex items-center justify-center mb-2">
              <Truck className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{operationsStatus.activeVehicles}</span>
              <span className="text-sm text-gray-500">/{operationsStatus.totalFleet}</span>
            </div>
            <div className="text-sm text-gray-600">Vehículos Activos</div>
          </div>
          
          <div className="metric-card text-center">
            <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{operationsStatus.onTimeDeliveries}%</div>
            <div className="text-sm text-gray-600">Entregas a Tiempo</div>
          </div>
          
          <div className="metric-card text-center">
            <Navigation className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{operationsStatus.averageSpeed}</div>
            <div className="text-sm text-gray-600">km/h Promedio</div>
          </div>
          
          <div className="metric-card text-center">
            <Battery className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{operationsStatus.fuelEfficiency}%</div>
            <div className="text-sm text-gray-600">Eficiencia Comb.</div>
          </div>
          
          <div className="metric-card text-center">
            <Wifi className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-600">98.7%</div>
            <div className="text-sm text-gray-600">Conectividad GPS</div>
          </div>
          
          <div className="metric-card text-center">
            <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{operationsStatus.securityIncidents}</div>
            <div className="text-sm text-gray-600">Incidentes Seguridad</div>
          </div>
        </div>
      </div>

      {/* Main Control Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Status */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Estado de la Flota</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Actualizado hace 30s</span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {fleetVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedVehicle === vehicle.id
                    ? 'border-blue-300 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getVehicleIcon(vehicle.status)}
                    <div>
                      <div className="font-bold text-gray-900">{vehicle.plateNumber}</div>
                      <div className="text-sm text-gray-600">{vehicle.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${getVehicleStatusColor(vehicle.status)}`}>
                      {vehicle.status === 'in-transit' ? 'En Ruta' :
                       vehicle.status === 'available' ? 'Disponible' :
                       vehicle.status === 'maintenance' ? 'Mantenimiento' : 'Fuera de Servicio'}
                    </span>
                    {vehicle.gpsEnabled && <Wifi className="w-4 h-4 text-green-600" />}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Ubicación</div>
                    <div className="font-medium">{vehicle.location.name}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Capacidad</div>
                    <div className="font-medium">{vehicle.capacity.toLocaleString()} kg</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Utilización</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${vehicle.utilizationRate}%` }}
                        />
                      </div>
                      <span className="font-medium text-xs">{vehicle.utilizationRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Telemetry & Alerts */}
        <div className="space-y-6">
          {/* Selected Vehicle Telemetry */}
          {telemetryData && (
            <div className="card">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Radio className="w-4 h-4 mr-2 text-red-600" />
                Telemetría en Vivo
              </h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{telemetryData.speed}</div>
                    <div className="text-xs text-gray-600">km/h</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{telemetryData.fuel}</div>
                    <div className="text-xs text-gray-600">% Combustible</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conductor:</span>
                    <span className="font-medium">{telemetryData.driver}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ruta:</span>
                    <span className="font-medium">{telemetryData.route}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ETA:</span>
                    <span className="font-medium text-green-600">{telemetryData.eta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Motor:</span>
                    <span className={`font-medium ${telemetryData.engine === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>
                      {telemetryData.engine}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-700 mb-1">Carga Actual</div>
                  <div className="text-sm">{telemetryData.cargo}</div>
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  Última actualización: {telemetryData.lastUpdate.toLocaleTimeString('es-MX')}
                </div>
              </div>
            </div>
          )}

          {/* Active Alerts */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                Alertas Activas
              </h4>
              <select
                className="px-2 py-1 border border-gray-300 rounded text-xs"
                value={alertFilter}
                onChange={(e) => setAlertFilter(e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="critical">Críticas</option>
                <option value="high">Altas</option>
                <option value="medium">Medias</option>
                <option value="low">Bajas</option>
              </select>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 border-l-4 rounded-r-lg ${getAlertSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{alert.type}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">{alert.message}</div>
                  {alert.affectedRoutes.length > 0 && (
                    <div className="text-xs text-gray-600">
                      Rutas afectadas: {alert.affectedRoutes.join(', ')}
                    </div>
                  )}
                  {!alert.acknowledged && (
                    <button className="mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Confirmar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Response Protocols & Active Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Response Protocols */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-600" />
            Protocolos de Respuesta
          </h3>
          <div className="space-y-3">
            {responseProtocols.map((protocol, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{protocol.type}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    protocol.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    protocol.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {protocol.severity === 'critical' ? 'Crítico' :
                     protocol.severity === 'high' ? 'Alto' : 'Medio'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium mb-1">Acciones:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {protocol.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="text-xs">{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Routes Monitor */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Rutas Activas
          </h3>
          <div className="space-y-3">
            {activeRoutes.filter(route => route.status === 'active').map((route) => (
              <div key={route.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    {route.origin.name} → {route.destination.name}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    En Ruta
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <div className="font-medium">Vehículo</div>
                    <div>{route.vehicleId || 'ZTL-2401'}</div>
                  </div>
                  <div>
                    <div className="font-medium">ETA</div>
                    <div>{route.estimatedTime}h</div>
                  </div>
                </div>
                
                {route.cargo && (
                  <div className="mt-3 p-2 bg-gray-50 rounded">
                    <div className="text-xs font-medium text-gray-700">{route.cargo.client}</div>
                    <div className="text-xs text-gray-600">{route.cargo.description}</div>
                  </div>
                )}
                
                <div className="mt-3 flex items-center space-x-4">
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    Rastrear
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">
                    Contactar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Command Center Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-600" />
          Estado del Centro de Comando
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">Sistema Principal</span>
            </div>
            <div className="text-sm text-green-700">Operacional • 99.8% uptime</div>
          </div>
          
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">GPS Tracking</span>
            </div>
            <div className="text-sm text-green-700">Activo • 88/88 vehículos conectados</div>
          </div>
          
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">Comunicaciones</span>
            </div>
            <div className="text-sm text-green-700">Normal • Todas las unidades</div>
          </div>
          
          <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-yellow-800">Sistema IA</span>
            </div>
            <div className="text-sm text-yellow-700">Mantenimiento • Finaliza en 2h</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsControlTower;