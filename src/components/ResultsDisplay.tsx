import React from 'react';
import { LCAResults, ImpactCategory } from '../types';
import { BarChart3, Droplets, Zap, TreePine, DollarSign, Clock, Recycle, Scale } from 'lucide-react';

interface ResultsDisplayProps {
  results?: LCAResults;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg">No results to display yet. Please submit turbine data to see analysis.</p>
      </div>
    );
  }

  const impactCategories: ImpactCategory[] = [
    {
      name: 'Carbon Footprint',
      value: results.carbonFootprint,
      unit: 'kg CO₂e',
      color: 'text-red-600',
    },
    {
      name: 'Energy Consumption',
      value: results.energyConsumption,
      unit: 'MWh',
      color: 'text-orange-600',
    },
    {
      name: 'Water Consumption',
      value: results.waterConsumption,
      unit: 'm³',
      color: 'text-blue-600',
    },
    {
      name: 'Land Use',
      value: results.landUse,
      unit: 'm²',
      color: 'text-green-600',
    },
  ];

  const performanceMetrics = [
    {
      name: 'Energy Return on Investment',
      value: results.energyReturnOnInvestment.toFixed(2),
      unit: 'ratio',
      icon: Zap,
      color: 'text-yellow-600',
    },
    {
      name: 'Carbon Payback Time',
      value: results.carbonPaybackTime.toFixed(1),
      unit: 'years',
      icon: Clock,
      color: 'text-purple-600',
    },
    {
      name: 'Recycling Potential',
      value: results.recyclingPotential.toFixed(1),
      unit: '%',
      icon: Recycle,
      color: 'text-green-600',
    },
    {
      name: 'Resource Depletion',
      value: results.resourceDepletion.toFixed(2),
      unit: 'score',
      icon: Scale,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Environmental Impact */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <TreePine className="h-5 w-5 mr-2 text-green-600" />
          Environmental Impact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impactCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow p-4 border border-gray-100"
            >
              <h4 className="text-sm font-medium text-gray-500">{category.name}</h4>
              <p className={`text-2xl font-bold ${category.color} mt-2`}>
                {category.value.toFixed(2)} {category.unit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric) => (
            <div
              key={metric.name}
              className="bg-white rounded-lg shadow p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-500">{metric.name}</h4>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <p className={`text-2xl font-bold ${metric.color}`}>
                {metric.value} {metric.unit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Economic Impact */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-green-600" />
          Economic Impact
        </h3>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Estimated Lifetime Cost</h4>
              <p className="text-2xl font-bold text-green-600">
                ${results.estimatedLifetimeCost.toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Energy Payback Time</h4>
              <p className="text-2xl font-bold text-blue-600">
                {results.energyPaybackTime.toFixed(1)} years
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;