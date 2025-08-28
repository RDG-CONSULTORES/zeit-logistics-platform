// Core Types for Zeit Logistics Platform

export interface KPIMetric {
  id: string;
  title: string;
  value: number | string;
  unit?: string;
  trend: 'up' | 'down' | 'stable';
  trendValue?: number;
  icon?: string;
  status?: 'success' | 'warning' | 'danger';
}

export interface Route {
  id: string;
  origin: Location;
  destination: Location;
  distance: number;
  estimatedTime: number;
  actualTime?: number;
  status: 'planned' | 'active' | 'completed' | 'delayed';
  vehicleId?: string;
  cargo?: CargoDetails;
  optimizationScore?: number;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'headquarters' | 'port' | 'border' | 'warehouse' | 'customer';
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: 'standard' | 'oversized' | 'specialized';
  status: 'available' | 'in-transit' | 'maintenance' | 'offline';
  location: Location;
  capacity: number;
  utilizationRate: number;
  gpsEnabled: boolean;
}

export interface CargoDetails {
  id: string;
  description: string;
  weight: number;
  volume: number;
  client: string;
  type: 'automotive' | 'oversized' | 'standard';
  specialRequirements?: string[];
}

export interface AIModule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'implementing';
  features: string[];
  integrations: string[];
  performance: {
    efficiency: number;
    accuracy: number;
    processingTime: number;
  };
  roi?: {
    costSavings: number;
    timeReduction: number;
  };
}

export interface CustomsDocument {
  id: string;
  type: 'import' | 'export' | 'transit';
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  documentNumber: string;
  submissionDate: Date;
  processingTime: number;
  aiClassification?: {
    confidence: number;
    suggestedCodes: string[];
  };
}

export interface PredictiveAnalytics {
  demandForecast: {
    period: string;
    volume: number;
    confidence: number;
    factors: string[];
  }[];
  seasonalTrends: {
    month: string;
    expectedVolume: number;
    historicalAverage: number;
  }[];
  capacityRecommendations: {
    vehiclesNeeded: number;
    driversNeeded: number;
    warehouseCapacity: number;
  };
}

export interface OperationalAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'delay' | 'maintenance' | 'weather' | 'customs' | 'security';
  message: string;
  affectedRoutes: string[];
  timestamp: Date;
  acknowledged: boolean;
}

export interface MethodologyPhase {
  id: string;
  name: string;
  duration: string;
  status: 'pending' | 'in-progress' | 'completed';
  deliverables: string[];
  risks: Risk[];
  milestones: Milestone[];
}

export interface Risk {
  id: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
}

export interface Milestone {
  id: string;
  name: string;
  date: Date;
  status: 'pending' | 'achieved' | 'delayed';
  dependencies?: string[];
}

export interface TechnologyStack {
  category: string;
  technologies: Technology[];
}

export interface Technology {
  name: string;
  version?: string;
  purpose: string;
  status: 'current' | 'planned' | 'evaluating';
}