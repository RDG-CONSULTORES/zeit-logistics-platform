import React, { useState } from 'react';
import { aiModules } from '../../data/mockData';
import { Brain, Route, TrendingUp, FileCheck, Shield, DollarSign, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const AIEcosystemMap: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'ai-routes': return Route;
      case 'ai-customs': return FileCheck;
      case 'ai-demand': return TrendingUp;
      case 'ai-maintenance': return Brain;
      case 'ai-pricing': return DollarSign;
      case 'ai-security': return Shield;
      default: return Brain;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'implementing': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4 text-gray-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getModulePosition = (index: number) => {
    const positions = [
      { x: 20, y: 20 }, // Top left
      { x: 70, y: 15 }, // Top right
      { x: 15, y: 50 }, // Middle left
      { x: 75, y: 55 }, // Middle right
      { x: 25, y: 80 }, // Bottom left
      { x: 65, y: 85 }, // Bottom right
    ];
    return positions[index] || { x: 50, y: 50 };
  };

  const selectedModuleData = selectedModule ? aiModules.find(m => m.id === selectedModule) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ecosistema de Inteligencia Artificial Zeit</h2>
            <p className="text-gray-600">Sistema integrado de IA para optimización logística</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{aiModules.filter(m => m.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Módulos Activos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{aiModules.filter(m => m.status === 'implementing').length}</div>
            <div className="text-sm text-gray-600">En Implementación</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{aiModules.length}</div>
            <div className="text-sm text-gray-600">Total Planificados</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mapa Interactivo del Ecosistema</h3>
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8" style={{ height: '500px' }}>
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {aiModules.map((_, index) => {
                if (index === aiModules.length - 1) return null;
                const pos1 = getModulePosition(index);
                const pos2 = getModulePosition(index + 1);
                return (
                  <line
                    key={`line-${index}`}
                    x1={`${pos1.x}%`}
                    y1={`${pos1.y}%`}
                    x2={`${pos2.x}%`}
                    y2={`${pos2.y}%`}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                );
              })}
            </svg>

            {/* AI Modules */}
            {aiModules.map((module, index) => {
              const position = getModulePosition(index);
              const Icon = getModuleIcon(module.id);
              const isSelected = selectedModule === module.id;

              return (
                <div
                  key={module.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'scale-110 z-10' : 'hover:scale-105'
                  }`}
                  style={{ left: `${position.x}%`, top: `${position.y}%`, zIndex: 2 }}
                  onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    module.status === 'active' ? 'bg-green-500 text-white' :
                    module.status === 'implementing' ? 'bg-yellow-500 text-white' :
                    'bg-gray-400 text-white'
                  } ${isSelected ? 'ring-4 ring-blue-300' : ''}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-xs font-medium text-gray-700 max-w-20 mx-auto leading-tight">
                      {module.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="flex justify-center mt-1">
                      {getStatusIcon(module.status)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="text-center mt-2">
                <div className="text-sm font-bold text-gray-800">Zeit AI Core</div>
                <div className="text-xs text-gray-600">Motor Central</div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Details */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalles del Módulo</h3>
          {selectedModuleData ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedModuleData.status === 'active' ? 'bg-green-100 text-green-600' :
                  selectedModuleData.status === 'implementing' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {React.createElement(getModuleIcon(selectedModuleData.id), { className: 'w-5 h-5' })}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedModuleData.name}</h4>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedModuleData.status)}
                    <span className="text-sm text-gray-600 capitalize">{selectedModuleData.status}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700">{selectedModuleData.description}</p>

              <div>
                <h5 className="font-medium text-gray-800 mb-2">Características Principales</h5>
                <ul className="space-y-1">
                  {selectedModuleData.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-gray-800 mb-2">Rendimiento</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Eficiencia</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${selectedModuleData.performance.efficiency}%` }} />
                      </div>
                      <span className="text-sm font-medium">{selectedModuleData.performance.efficiency}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Precisión</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${selectedModuleData.performance.accuracy}%` }} />
                      </div>
                      <span className="text-sm font-medium">{selectedModuleData.performance.accuracy}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedModuleData.roi && (
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">ROI Proyectado</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{selectedModuleData.roi.costSavings}%</div>
                      <div className="text-xs text-gray-600">Reducción Costos</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{selectedModuleData.roi.timeReduction}%</div>
                      <div className="text-xs text-gray-600">Ahorro Tiempo</div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h5 className="font-medium text-gray-800 mb-2">Integraciones</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedModuleData.integrations.map((integration, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Selecciona un módulo de IA para ver sus detalles</p>
            </div>
          )}
        </div>
      </div>

      {/* Module Status Grid */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de Implementación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiModules.map((module) => {
            const Icon = getModuleIcon(module.id);
            return (
              <div key={module.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                   onClick={() => setSelectedModule(module.id)}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    module.status === 'active' ? 'bg-green-100 text-green-600' :
                    module.status === 'implementing' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{module.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(module.status)}
                      <span className="text-xs text-gray-600 capitalize">{module.status}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{module.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AIEcosystemMap;