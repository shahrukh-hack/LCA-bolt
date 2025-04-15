export interface TurbineData {
  // Basic Specifications
  model: string;
  capacity: number; // MW
  rotorDiameter: number; // meters
  hubHeight: number; // meters
  
  // Manufacturing & Transport
  manufacturingEnergy: number; // MWh
  transportDistance: number; // km
  transportMode: 'road' | 'rail' | 'sea' | 'mixed';
  
  // Operation & Maintenance
  maintenanceFrequency: number; // per year
  operationalLife: number; // years
  
  // End of Life
  decommissioningMethod: 'recycling' | 'landfill' | 'remanufacturing';
  
  // Material Composition (tons)
  materials: {
    steel: number;
    fiberglass: number;
    copper: number;
    aluminum: number;
    concrete: number; // for foundation
    rareEarth: number; // for permanent magnets
    plastic: number; // various components
    electronics: number; // control systems
  };
}

export interface LCAResults {
  // Environmental Impact
  carbonFootprint: number; // kg CO2e
  energyConsumption: number; // MWh
  waterConsumption: number; // m³
  landUse: number; // m²
  
  // Material Flow
  recyclingPotential: number; // percentage
  wasteGeneration: number; // tons
  resourceDepletion: number; // normalized score
  
  // Economic Metrics
  estimatedLifetimeCost: number; // USD
  energyPaybackTime: number; // years
  
  // Performance Metrics
  energyReturnOnInvestment: number; // ratio
  carbonPaybackTime: number; // years
}

export interface MaterialFlow {
  source: string;
  target: string;
  value: number;
}

export interface ImpactCategory {
  name: string;
  value: number;
  unit: string;
  color: string;
}