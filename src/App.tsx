import React, { useState } from 'react';
import { Wind, BarChart3, LineChart, Download, ArrowRight, Recycle } from 'lucide-react';
import TurbineForm from './components/TurbineForm';
import ResultsDisplay from './components/ResultsDisplay';
import ComparisonChart from './components/ComparisonChart';
import { TurbineData, LCAResults } from './types';

function App() {
  const [turbineData, setTurbineData] = useState<TurbineData[]>([]);
  const [results, setResults] = useState<LCAResults[]>([]);

  const handleTurbineSubmit = (data: TurbineData) => {
    const lcaResults = calculateLCA(data);
    setTurbineData([...turbineData, data]);
    setResults([...results, lcaResults]);
  };

  const calculateLCA = (data: TurbineData): LCAResults => {
    // Enhanced LCA calculations
    const carbonFootprint = 
      data.manufacturingEnergy * 0.5 + 
      (data.transportDistance * getTransportEmissionFactor(data.transportMode)) +
      Object.entries(data.materials).reduce((total, [material, amount]) => 
        total + amount * getMaterialEmissionFactor(material), 0);

    const energyConsumption = 
      data.manufacturingEnergy + 
      (data.transportDistance * getTransportEnergyFactor(data.transportMode)) +
      (data.maintenanceFrequency * data.operationalLife * 50);

    const waterConsumption = 
      data.manufacturingEnergy * 0.3 +
      Object.entries(data.materials).reduce((total, [material, amount]) => 
        total + amount * getMaterialWaterFactor(material), 0);

    const recyclingPotential = 
      data.decommissioningMethod === 'recycling' ? 75 :
      data.decommissioningMethod === 'remanufacturing' ? 85 : 25;

    return {
      carbonFootprint,
      energyConsumption,
      waterConsumption,
      landUse: data.capacity * 100, // Simplified calculation
      recyclingPotential,
      wasteGeneration: calculateWasteGeneration(data),
      resourceDepletion: calculateResourceDepletion(data),
      estimatedLifetimeCost: calculateLifetimeCost(data),
      energyPaybackTime: calculateEnergyPaybackTime(data),
      energyReturnOnInvestment: calculateEROI(data),
      carbonPaybackTime: calculateCarbonPaybackTime(data)
    };
  };

  // Helper functions for calculations
  const getTransportEmissionFactor = (mode: string): number => {
    const factors = {
      road: 0.2,
      rail: 0.1,
      sea: 0.05,
      mixed: 0.15
    };
    return factors[mode as keyof typeof factors];
  };

  const getTransportEnergyFactor = (mode: string): number => {
    const factors = {
      road: 0.15,
      rail: 0.08,
      sea: 0.04,
      mixed: 0.1
    };
    return factors[mode as keyof typeof factors];
  };

  const getMaterialEmissionFactor = (material: string): number => {
    const factors: Record<string, number> = {
      steel: 2.5,
      fiberglass: 1.8,
      copper: 3.5,
      aluminum: 8.0,
      concrete: 0.8,
      rareEarth: 15.0,
      plastic: 2.0,
      electronics: 25.0
    };
    return factors[material] || 1.0;
  };

  const getMaterialWaterFactor = (material: string): number => {
    const factors: Record<string, number> = {
      steel: 1.2,
      fiberglass: 0.8,
      copper: 2.0,
      aluminum: 4.0,
      concrete: 0.3,
      rareEarth: 8.0,
      plastic: 1.0,
      electronics: 10.0
    };
    return factors[material] || 1.0;
  };

  const calculateWasteGeneration = (data: TurbineData): number => {
    const totalMaterials = Object.values(data.materials).reduce((sum, amount) => sum + amount, 0);
    return data.decommissioningMethod === 'landfill' ? totalMaterials * 0.9 : totalMaterials * 0.2;
  };

  const calculateResourceDepletion = (data: TurbineData): number => {
    return (data.materials.rareEarth * 5 + data.materials.copper * 2 + data.materials.aluminum * 1.5) / data.capacity;
  };

  const calculateLifetimeCost = (data: TurbineData): number => {
    const installationCost = data.capacity * 1000000; // $1M per MW
    const maintenanceCost = data.maintenanceFrequency * data.operationalLife * 10000;
    const decommissioningCost = data.capacity * 100000;
    return installationCost + maintenanceCost + decommissioningCost;
  };

  const calculateEnergyPaybackTime = (data: TurbineData): number => {
    const annualEnergy = data.capacity * 8760 * 0.4; // Hours per year * capacity factor
    return data.manufacturingEnergy / annualEnergy;
  };

  const calculateEROI = (data: TurbineData): number => {
    const lifetimeEnergy = data.capacity * 8760 * 0.4 * data.operationalLife;
    return lifetimeEnergy / data.manufacturingEnergy;
  };

  const calculateCarbonPaybackTime = (data: TurbineData): number => {
    const annualCarbonOffset = data.capacity * 8760 * 0.4 * 0.5; // Assuming 0.5 kg CO2e/kWh grid offset
    return data.carbonFootprint / annualCarbonOffset;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wind className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Wind Turbine LCA & MFA Analysis</h1>
          </div>
          <nav className="flex space-x-4">
            <a href="#analysis" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <BarChart3 className="h-5 w-5" />
              <span>Analysis</span>
            </a>
            <a href="#comparison" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
              <LineChart className="h-5 w-5" />
              <span>Compare</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Wind className="h-5 w-5 mr-2 text-green-600" />
              Input Parameters
            </h2>
            <TurbineForm onSubmit={handleTurbineSubmit} />
          </section>

          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Analysis Results
            </h2>
            <ResultsDisplay results={results[results.length - 1]} />
          </section>
        </div>

        {turbineData.length > 1 && (
          <section className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-purple-600" />
              Turbine Comparison
            </h2>
            <ComparisonChart turbineData={turbineData} results={results} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;