import type { KPIMetric, Location, Route, Vehicle, AIModule, CustomsDocument, OperationalAlert, MethodologyPhase, TechnologyStack } from '../types';

// Zeit operational locations
export const zeitLocations: Location[] = [
  { id: 'qro', name: 'Querétaro HQ', city: 'Querétaro', state: 'QRO', country: 'México', coordinates: { lat: 20.5888, lng: -100.3899 }, type: 'headquarters' },
  { id: 'gto', name: 'GTO Puerto Interior', city: 'Silao', state: 'GTO', country: 'México', coordinates: { lat: 20.9434, lng: -101.4263 }, type: 'warehouse' },
  { id: 'nld', name: 'Nuevo Laredo', city: 'Nuevo Laredo', state: 'TAM', country: 'México', coordinates: { lat: 27.4861, lng: -99.5077 }, type: 'border' },
  { id: 'tij', name: 'Tijuana', city: 'Tijuana', state: 'BC', country: 'México', coordinates: { lat: 32.5149, lng: -117.0382 }, type: 'border' },
  { id: 'mzo', name: 'Manzanillo', city: 'Manzanillo', state: 'COL', country: 'México', coordinates: { lat: 19.0514, lng: -104.3175 }, type: 'port' },
  { id: 'ver', name: 'Veracruz', city: 'Veracruz', state: 'VER', country: 'México', coordinates: { lat: 19.1738, lng: -96.1342 }, type: 'port' },
  { id: 'cdmx', name: 'Ciudad de México', city: 'CDMX', state: 'CDMX', country: 'México', coordinates: { lat: 19.4326, lng: -99.1332 }, type: 'customer' },
];

// Key Performance Indicators
export const kpiMetrics: KPIMetric[] = [
  { id: 'fleet', title: 'Flota Activa', value: '88', unit: 'vehículos', trend: 'stable', status: 'success' },
  { id: 'utilization', title: 'Utilización de Flota', value: '87%', trend: 'up', trendValue: 3.2, status: 'success' },
  { id: 'ontime', title: 'Entregas a Tiempo', value: '94.6%', trend: 'up', trendValue: 1.8, status: 'success' },
  { id: 'customs', title: 'Tiempo Promedio Aduana', value: '2.4', unit: 'horas', trend: 'down', trendValue: -15, status: 'success' },
  { id: 'revenue', title: 'Ingresos Mensuales', value: '$12.4M', unit: 'MXN', trend: 'up', trendValue: 8.5, status: 'success' },
  { id: 'incidents', title: 'Incidentes Seguridad', value: '0', unit: 'este mes', trend: 'stable', status: 'success' },
];

// Active routes
export const activeRoutes: Route[] = [
  {
    id: 'r001',
    origin: zeitLocations[0], // Querétaro
    destination: zeitLocations[2], // Nuevo Laredo
    distance: 820,
    estimatedTime: 8.2,
    actualTime: 8.5,
    status: 'active',
    vehicleId: 'v001',
    cargo: { id: 'c001', description: 'Componentes BMW', weight: 24000, volume: 85, client: 'BMW', type: 'automotive' },
    optimizationScore: 92
  },
  {
    id: 'r002',
    origin: zeitLocations[1], // GTO
    destination: zeitLocations[3], // Tijuana
    distance: 1850,
    estimatedTime: 18.5,
    status: 'active',
    vehicleId: 'v002',
    cargo: { id: 'c002', description: 'Partes Tesla', weight: 18000, volume: 70, client: 'Tesla', type: 'automotive' },
    optimizationScore: 88
  },
  {
    id: 'r003',
    origin: zeitLocations[0], // Querétaro
    destination: zeitLocations[4], // Manzanillo
    distance: 680,
    estimatedTime: 6.8,
    status: 'planned',
    cargo: { id: 'c003', description: 'Equipo Nissan', weight: 22000, volume: 90, client: 'Nissan', type: 'oversized' },
    optimizationScore: 95
  },
];

// Fleet vehicles
export const fleetVehicles: Vehicle[] = [
  { id: 'v001', plateNumber: 'ZTL-2401', type: 'standard', status: 'in-transit', location: zeitLocations[0], capacity: 30000, utilizationRate: 80, gpsEnabled: true },
  { id: 'v002', plateNumber: 'ZTL-2402', type: 'specialized', status: 'in-transit', location: zeitLocations[1], capacity: 25000, utilizationRate: 72, gpsEnabled: true },
  { id: 'v003', plateNumber: 'ZTL-2403', type: 'oversized', status: 'available', location: zeitLocations[0], capacity: 35000, utilizationRate: 0, gpsEnabled: true },
  { id: 'v004', plateNumber: 'ZTL-2404', type: 'standard', status: 'maintenance', location: zeitLocations[1], capacity: 30000, utilizationRate: 0, gpsEnabled: true },
];

// AI Modules
export const aiModules: AIModule[] = [
  {
    id: 'ai-routes',
    name: 'Optimización de Rutas IA',
    description: 'Optimización inteligente de rutas con análisis en tiempo real de tráfico, clima y condiciones viales',
    status: 'active',
    features: ['Análisis predictivo de tráfico', 'Integración meteorológica', 'Cálculo dinámico de rutas', 'Ahorro de combustible'],
    integrations: ['GPS Fleet', 'Weather API', 'Traffic Systems'],
    performance: { efficiency: 92, accuracy: 96, processingTime: 1.2 },
    roi: { costSavings: 18, timeReduction: 22 }
  },
  {
    id: 'ai-customs',
    name: 'Inteligencia Aduanal',
    description: 'Procesamiento automatizado de documentos aduanales con clasificación IA y predicción de tiempos',
    status: 'active',
    features: ['Clasificación automática', 'Validación de documentos', 'Predicción de tiempos', 'Alertas regulatorias'],
    integrations: ['SAT', 'VUCEM', 'Customs Database'],
    performance: { efficiency: 88, accuracy: 94, processingTime: 0.8 },
    roi: { costSavings: 15, timeReduction: 40 }
  },
  {
    id: 'ai-demand',
    name: 'Análisis Predictivo',
    description: 'Pronóstico de demanda para el sector automotriz con análisis de tendencias estacionales',
    status: 'implementing',
    features: ['Pronóstico de demanda', 'Análisis estacional', 'Recomendaciones de capacidad', 'Inteligencia de mercado'],
    integrations: ['ERP', 'Market Data', 'Client Systems'],
    performance: { efficiency: 85, accuracy: 91, processingTime: 2.5 },
    roi: { costSavings: 12, timeReduction: 15 }
  },
  {
    id: 'ai-maintenance',
    name: 'Mantenimiento Predictivo',
    description: 'Predicción de fallas y mantenimiento preventivo basado en análisis de datos IoT',
    status: 'implementing',
    features: ['Análisis IoT', 'Predicción de fallas', 'Programación automática', 'Optimización de costos'],
    integrations: ['Vehicle Sensors', 'Maintenance Systems'],
    performance: { efficiency: 90, accuracy: 93, processingTime: 1.5 },
    roi: { costSavings: 25, timeReduction: 30 }
  },
  {
    id: 'ai-pricing',
    name: 'Inteligencia de Precios',
    description: 'Sistema dinámico de pricing basado en demanda, competencia y condiciones de mercado',
    status: 'inactive',
    features: ['Análisis competitivo', 'Pricing dinámico', 'Optimización de márgenes', 'Pronóstico de ingresos'],
    integrations: ['Market APIs', 'Competitor Data'],
    performance: { efficiency: 87, accuracy: 92, processingTime: 1.0 },
    roi: { costSavings: 8, timeReduction: 10 }
  },
  {
    id: 'ai-security',
    name: 'Seguridad Inteligente',
    description: 'Monitoreo de seguridad en tiempo real con detección de anomalías y respuesta automatizada',
    status: 'active',
    features: ['Detección de anomalías', 'Alertas en tiempo real', 'Análisis de riesgos', 'Respuesta automatizada'],
    integrations: ['Security Systems', 'GPS', 'Alert Systems'],
    performance: { efficiency: 94, accuracy: 97, processingTime: 0.5 },
    roi: { costSavings: 20, timeReduction: 35 }
  }
];

// Operational Alerts
export const operationalAlerts: OperationalAlert[] = [
  {
    id: 'alert001',
    severity: 'medium',
    type: 'weather',
    message: 'Lluvia intensa en carretera Querétaro-Nuevo Laredo km 450',
    affectedRoutes: ['r001'],
    timestamp: new Date(),
    acknowledged: false
  },
  {
    id: 'alert002',
    severity: 'high',
    type: 'customs',
    message: 'Retraso en procesamiento aduanal - Nuevo Laredo',
    affectedRoutes: ['r001'],
    timestamp: new Date(Date.now() - 3600000),
    acknowledged: true
  },
  {
    id: 'alert003',
    severity: 'low',
    type: 'maintenance',
    message: 'Mantenimiento programado vehículo ZTL-2404',
    affectedRoutes: [],
    timestamp: new Date(Date.now() - 7200000),
    acknowledged: true
  }
];

// Methodology Phases
export const methodologyPhases: MethodologyPhase[] = [
  {
    id: 'phase1',
    name: 'Evaluación y Análisis',
    duration: '4 semanas',
    status: 'completed',
    deliverables: ['Análisis de situación actual', 'Identificación de gaps', 'Definición de objetivos'],
    risks: [
      { id: 'r1', description: 'Resistencia al cambio', probability: 'medium', impact: 'high', mitigation: 'Plan de gestión del cambio' }
    ],
    milestones: [
      { id: 'm1', name: 'Análisis completado', date: new Date('2024-03-15'), status: 'achieved' }
    ]
  },
  {
    id: 'phase2',
    name: 'Diseño de Solución',
    duration: '6 semanas',
    status: 'in-progress',
    deliverables: ['Arquitectura técnica', 'Especificaciones funcionales', 'Plan de integración'],
    risks: [
      { id: 'r2', description: 'Complejidad técnica', probability: 'high', impact: 'medium', mitigation: 'POC y validación temprana' }
    ],
    milestones: [
      { id: 'm2', name: 'Arquitectura aprobada', date: new Date('2024-04-30'), status: 'pending' }
    ]
  },
  {
    id: 'phase3',
    name: 'Implementación',
    duration: '16 semanas',
    status: 'pending',
    deliverables: ['Módulos IA implementados', 'Integraciones completadas', 'Sistema en producción'],
    risks: [
      { id: 'r3', description: 'Retrasos en integración', probability: 'medium', impact: 'medium', mitigation: 'Buffer de tiempo y recursos' }
    ],
    milestones: [
      { id: 'm3', name: 'Go-live', date: new Date('2024-08-30'), status: 'pending' }
    ]
  }
];

// Technology Stack
export const technologyStack: TechnologyStack[] = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'React 18', version: '18.2.0', purpose: 'Framework UI', status: 'current' },
      { name: 'TypeScript', version: '5.0', purpose: 'Type safety', status: 'current' },
      { name: 'Tailwind CSS', version: '3.3', purpose: 'Styling', status: 'current' },
    ]
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'Node.js', version: '20 LTS', purpose: 'Runtime', status: 'planned' },
      { name: 'PostgreSQL', version: '15', purpose: 'Database', status: 'planned' },
      { name: 'Redis', version: '7', purpose: 'Caching', status: 'planned' },
    ]
  },
  {
    category: 'AI/ML',
    technologies: [
      { name: 'TensorFlow', purpose: 'ML Models', status: 'evaluating' },
      { name: 'Python', version: '3.11', purpose: 'AI Development', status: 'planned' },
      { name: 'Apache Spark', purpose: 'Big Data Processing', status: 'evaluating' },
    ]
  },
  {
    category: 'Infrastructure',
    technologies: [
      { name: 'AWS', purpose: 'Cloud Platform', status: 'planned' },
      { name: 'Docker', purpose: 'Containerization', status: 'planned' },
      { name: 'Kubernetes', purpose: 'Orchestration', status: 'evaluating' },
    ]
  }
];

// Customs Documents
export const customsDocuments: CustomsDocument[] = [
  {
    id: 'doc001',
    type: 'export',
    status: 'approved',
    documentNumber: 'EXP-2024-0342',
    submissionDate: new Date(Date.now() - 86400000),
    processingTime: 2.1,
    aiClassification: { confidence: 96, suggestedCodes: ['8708.29.99', '8708.30.01'] }
  },
  {
    id: 'doc002',
    type: 'import',
    status: 'processing',
    documentNumber: 'IMP-2024-0488',
    submissionDate: new Date(Date.now() - 3600000),
    processingTime: 1.2,
    aiClassification: { confidence: 92, suggestedCodes: ['8544.30.01'] }
  },
  {
    id: 'doc003',
    type: 'transit',
    status: 'pending',
    documentNumber: 'TRA-2024-0156',
    submissionDate: new Date(),
    processingTime: 0,
    aiClassification: { confidence: 88, suggestedCodes: ['8703.23.01'] }
  }
];