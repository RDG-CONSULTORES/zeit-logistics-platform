import React, { useState } from 'react';
import { customsDocuments } from '../../data/mockData';
import { FileCheck, Clock, CheckCircle, AlertTriangle, Zap, Brain, TrendingUp, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const CustomsIntelligence: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [processingMode, setProcessingMode] = useState('ai-assisted');

  // Mock AI processing metrics
  const aiMetrics = {
    classificationAccuracy: 96.2,
    processingSpeed: 2.4, // minutes
    costSavings: 42,
    timeReduction: 58,
    documentsProcessed: 1247
  };

  // Processing time comparison data
  const processingComparison = [
    { method: 'Manual', time: 8.5, cost: 100, accuracy: 92 },
    { method: 'Semi-Automatizado', time: 4.2, cost: 60, accuracy: 95 },
    { method: 'IA Completa', time: 2.4, cost: 35, accuracy: 96 },
  ];

  // Document type distribution
  const documentTypes = [
    { name: 'Importación', value: 45, color: '#3b82f6' },
    { name: 'Exportación', value: 35, color: '#10b981' },
    { name: 'Tránsito', value: 20, color: '#f59e0b' },
  ];

  // Processing timeline data
  const timelineData = [
    { hour: '00:00', submitted: 12, processed: 11, approved: 10 },
    { hour: '06:00', submitted: 18, processed: 17, approved: 16 },
    { hour: '09:00', submitted: 28, processed: 27, approved: 25 },
    { hour: '12:00', submitted: 35, processed: 34, approved: 32 },
    { hour: '15:00', submitted: 42, processed: 41, approved: 38 },
    { hour: '18:00', submitted: 25, processed: 24, approved: 23 },
  ];

  // Tariff code suggestions based on AI analysis
  const tariffSuggestions = [
    { code: '8708.29.99', description: 'Otras partes de carrocería', confidence: 96, frequency: 234 },
    { code: '8708.30.01', description: 'Frenos y servofrenos', confidence: 94, frequency: 187 },
    { code: '8544.30.01', description: 'Juegos de cables', confidence: 92, frequency: 156 },
    { code: '8703.23.01', description: 'Vehículos eléctricos', confidence: 89, frequency: 98 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <FileCheck className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = filterStatus === 'all' 
    ? customsDocuments 
    : customsDocuments.filter(doc => doc.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header with AI Metrics */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Centro de Inteligencia Aduanal</h2>
              <p className="text-gray-600">Procesamiento automatizado con IA y cumplimiento regulatorio</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={processingMode}
              onChange={(e) => setProcessingMode(e.target.value)}
            >
              <option value="manual">Manual</option>
              <option value="semi-auto">Semi-Automatizado</option>
              <option value="ai-assisted">IA Asistida</option>
              <option value="full-ai">IA Completa</option>
            </select>
            <button className="btn-primary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar Reportes</span>
            </button>
          </div>
        </div>

        {/* AI Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="metric-card text-center">
            <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{aiMetrics.classificationAccuracy}%</div>
            <div className="text-sm text-gray-600">Precisión IA</div>
          </div>
          <div className="metric-card text-center">
            <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{aiMetrics.processingSpeed}m</div>
            <div className="text-sm text-gray-600">Tiempo Promedio</div>
          </div>
          <div className="metric-card text-center">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{aiMetrics.costSavings}%</div>
            <div className="text-sm text-gray-600">Ahorro Costos</div>
          </div>
          <div className="metric-card text-center">
            <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{aiMetrics.timeReduction}%</div>
            <div className="text-sm text-gray-600">Reducción Tiempo</div>
          </div>
          <div className="metric-card text-center">
            <FileCheck className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-600">{aiMetrics.documentsProcessed.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Docs Procesados</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Efficiency */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparación de Eficiencia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processingComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="method" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" fill="#3b82f6" name="Tiempo (min)" />
              <Bar dataKey="cost" fill="#f59e0b" name="Costo Relativo" />
              <Bar dataKey="accuracy" fill="#10b981" name="Precisión %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Document Type Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución por Tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={documentTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {documentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Document Processing Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Documentos Aduanales</h3>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="pending">Pendientes</option>
              <option value="processing">Procesando</option>
              <option value="approved">Aprobados</option>
              <option value="rejected">Rechazados</option>
            </select>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedDocument === doc.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDocument(selectedDocument === doc.id ? null : doc.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(doc.status)}
                    <span className="font-medium">{doc.documentNumber}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status === 'approved' ? 'Aprobado' :
                     doc.status === 'processing' ? 'Procesando' :
                     doc.status === 'pending' ? 'Pendiente' : 'Rechazado'}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <div className="font-medium">Tipo</div>
                    <div className="capitalize">{doc.type}</div>
                  </div>
                  <div>
                    <div className="font-medium">Tiempo Procesamiento</div>
                    <div>{doc.processingTime.toFixed(1)}h</div>
                  </div>
                  <div>
                    <div className="font-medium">Fecha Envío</div>
                    <div>{new Date(doc.submissionDate).toLocaleDateString('es-MX')}</div>
                  </div>
                </div>

                {doc.aiClassification && (
                  <div className="mt-3 p-2 bg-purple-50 rounded">
                    <div className="text-xs font-medium text-purple-800 mb-1">
                      Clasificación IA (Confianza: {doc.aiClassification.confidence}%)
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {doc.aiClassification.suggestedCodes.map((code, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Classification Assistant */}
        <div className="space-y-6">
          {/* Tariff Code Suggestions */}
          <div className="card">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Brain className="w-4 h-4 mr-2 text-purple-600" />
              Códigos Arancelarios IA
            </h4>
            <div className="space-y-2">
              {tariffSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm font-bold">{suggestion.code}</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-12 bg-gray-200 rounded-full h-1">
                        <div className="bg-purple-600 h-1 rounded-full" style={{ width: `${suggestion.confidence}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{suggestion.confidence}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">{suggestion.description}</div>
                  <div className="text-xs text-purple-600">Usado {suggestion.frequency} veces</div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Updates */}
          <div className="card">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
              Actualizaciones Regulatorias
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="font-medium text-orange-800">Nueva Regulación T-MEC</div>
                <div className="text-orange-700 mt-1">Cambios en requisitos de origen para vehículos eléctricos</div>
                <div className="text-xs text-orange-600 mt-2">Vigente desde: 1 Sep 2024</div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-medium text-blue-800">Actualización SAT</div>
                <div className="text-blue-700 mt-1">Nuevos códigos arancelarios para componentes híbridos</div>
                <div className="text-xs text-blue-600 mt-2">Vigente desde: 15 Aug 2024</div>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-800">Facilitación Comercial</div>
                <div className="text-green-700 mt-1">Reducción de tiempos en Nuevo Laredo</div>
                <div className="text-xs text-green-600 mt-2">Vigente desde: 1 Aug 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Timeline */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline de Procesamiento Diario</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="hour" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="submitted" stroke="#6b7280" strokeWidth={2} name="Enviados" />
            <Line type="monotone" dataKey="processed" stroke="#3b82f6" strokeWidth={2} name="Procesados" />
            <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} name="Aprobados" />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Rendimiento Actual</span>
          </div>
          <div className="text-sm text-green-700">
            • Tiempo promedio de procesamiento reducido en 58% vs método manual<br/>
            • Precisión en clasificación arancelaria del 96.2%<br/>
            • Tasa de aprobación automática del 87% en documentos bien clasificados
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomsIntelligence;