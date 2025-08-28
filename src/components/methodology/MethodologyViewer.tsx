import React, { useState } from 'react';
import { methodologyPhases, technologyStack } from '../../data/mockData';
import { Book, Clock, CheckCircle, AlertTriangle, Users, Target, Layers, Settings } from 'lucide-react';

const MethodologyViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('phases');
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const tabs = [
    { id: 'phases', name: 'Fases del Proyecto', icon: Target },
    { id: 'technology', name: 'Stack Tecnológico', icon: Layers },
    { id: 'architecture', name: 'Arquitectura de Conexiones', icon: Settings },
    { id: 'implementation', name: 'Guía de Implementación', icon: Book },
  ];

  // Mock implementation timeline
  const implementationTimeline = [
    { week: 1, phase: 'Análisis', activities: ['Evaluación actual', 'Identificación gaps', 'Definición objetivos'] },
    { week: 4, phase: 'Análisis', activities: ['Documentación procesos', 'Análisis riesgos', 'Plan trabajo'] },
    { week: 8, phase: 'Diseño', activities: ['Arquitectura técnica', 'Especificaciones', 'Prototipos'] },
    { week: 12, phase: 'Diseño', activities: ['Validación diseño', 'Plan integración', 'Preparación desarrollo'] },
    { week: 20, phase: 'Implementación', activities: ['Desarrollo módulos', 'Integraciones', 'Testing'] },
    { week: 24, phase: 'Implementación', activities: ['Despliegue', 'Training', 'Go-live'] },
  ];

  // Mock integration architecture
  const integrationPoints = [
    { system: 'ERP SAP', type: 'Core Business', status: 'planned', complexity: 'High' },
    { system: 'GPS Fleet Management', type: 'Operational', status: 'active', complexity: 'Medium' },
    { system: 'VUCEM (Customs)', type: 'Regulatory', status: 'planned', complexity: 'High' },
    { system: 'Weather APIs', type: 'External Service', status: 'active', complexity: 'Low' },
    { system: 'Client Portals', type: 'Customer Facing', status: 'planned', complexity: 'Medium' },
    { system: 'Mobile Apps', type: 'Operational', status: 'planned', complexity: 'Medium' },
  ];

  // Mock implementation guides
  const implementationGuides = [
    {
      title: 'Preparación de Infraestructura',
      description: 'Configuración de servidores, bases de datos y networking',
      duration: '2 semanas',
      team: 'DevOps + IT',
      deliverables: ['Servidores configurados', 'Bases de datos instaladas', 'Conectividad establecida']
    },
    {
      title: 'Integración de Sistemas',
      description: 'Conexión con ERP, GPS y sistemas externos',
      duration: '4 semanas',
      team: 'Backend + Integration',
      deliverables: ['APIs desarrolladas', 'Conectores implementados', 'Testing de integración']
    },
    {
      title: 'Entrenamiento del Personal',
      description: 'Capacitación en nuevos procesos y herramientas',
      duration: '3 semanas',
      team: 'Training + Operations',
      deliverables: ['Material de entrenamiento', 'Sesiones realizadas', 'Certificación usuarios']
    },
    {
      title: 'Despliegue y Go-Live',
      description: 'Puesta en producción y soporte inicial',
      duration: '2 semanas',
      team: 'Full Team',
      deliverables: ['Sistema en producción', 'Monitoreo activo', 'Soporte establecido']
    }
  ];

  const getPhaseStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending': return <AlertTriangle className="w-5 h-5 text-gray-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTechStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'evaluating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const renderPhases = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {methodologyPhases.map((phase) => (
          <div
            key={phase.id}
            className={`card cursor-pointer transition-all ${
              selectedPhase === phase.id ? 'ring-2 ring-blue-300 bg-blue-50' : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getPhaseStatusIcon(phase.status)}
                <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
              </div>
              <span className="text-sm text-gray-600">{phase.duration}</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Entregables</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {phase.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {phase.risks.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Riesgos Principales</h4>
                  <div className="space-y-2">
                    {phase.risks.slice(0, 2).map((risk) => (
                      <div key={risk.id} className="p-2 bg-orange-50 border border-orange-200 rounded text-xs">
                        <div className="font-medium text-orange-800">{risk.description}</div>
                        <div className="text-orange-700 mt-1">Mitigación: {risk.mitigation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Timeline */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cronograma de Implementación</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          <div className="space-y-6">
            {implementationTimeline.map((item, index) => (
              <div key={index} className="relative flex items-start space-x-4">
                <div className="relative z-10 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {item.week}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{item.phase}</h4>
                    <span className="text-sm text-gray-500">Semana {item.week}</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {item.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTechnology = () => (
    <div className="space-y-6">
      {technologyStack.map((category) => (
        <div key={category.category} className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.technologies.map((tech, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{tech.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getTechStatusColor(tech.status)}`}>
                    {tech.status === 'current' ? 'Actual' :
                     tech.status === 'planned' ? 'Planificado' : 'Evaluando'}
                  </span>
                </div>
                {tech.version && (
                  <div className="text-sm text-gray-600 mb-2">Versión: {tech.version}</div>
                )}
                <div className="text-sm text-gray-700">{tech.purpose}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderArchitecture = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Puntos de Integración</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-700">Sistema</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Tipo</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Complejidad</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Notas</th>
              </tr>
            </thead>
            <tbody>
              {integrationPoints.map((point, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 font-medium">{point.system}</td>
                  <td className="py-3 text-sm text-gray-600">{point.type}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      point.status === 'active' ? 'bg-green-100 text-green-800' :
                      point.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {point.status === 'active' ? 'Activo' : 'Planificado'}
                    </span>
                  </td>
                  <td className={`py-3 text-sm font-medium ${getComplexityColor(point.complexity)}`}>
                    {point.complexity === 'High' ? 'Alta' :
                     point.complexity === 'Medium' ? 'Media' : 'Baja'}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {point.complexity === 'High' ? 'Requiere especialista' :
                     point.status === 'active' ? 'Ya implementado' : 'Pendiente desarrollo'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Diagrama de Arquitectura</h3>
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8" style={{ height: '400px' }}>
          <div className="text-center text-gray-600">
            <Layers className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Diagrama de Arquitectura Completo</p>
            <p className="text-sm">
              Incluye todos los componentes del sistema, flujos de datos,<br/>
              puntos de integración y protocolos de seguridad.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Ver Diagrama Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImplementation = () => (
    <div className="space-y-6">
      {implementationGuides.map((guide, index) => (
        <div key={index} className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
              <p className="text-gray-600 mb-3">{guide.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{guide.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{guide.team}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Entregables Esperados</h4>
            <ul className="space-y-2">
              {guide.deliverables.map((deliverable, delIndex) => (
                <li key={delIndex} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Book className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Metodología de Implementación Zeit AI</h2>
            <p className="text-gray-600">Guía completa para la transformación digital</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'phases' && renderPhases()}
        {activeTab === 'technology' && renderTechnology()}
        {activeTab === 'architecture' && renderArchitecture()}
        {activeTab === 'implementation' && renderImplementation()}
      </div>
    </div>
  );
};

export default MethodologyViewer;