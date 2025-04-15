import React from 'react';
import { TurbineData, LCAResults } from '../types';
import { BarChart3 } from 'lucide-react';

interface ComparisonChartProps {
  turbineData: TurbineData[];
  results: LCAResults[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ results }) => {
  const metrics = [
    { key: 'carbonFootprint', label: 'Carbon Footprint (kg CO2e)', color: 'bg-red-500' },
    { key: 'energyConsumption', label: 'Energy Consumption (MWh)', color: 'bg-orange-500' },
    { key: 'waterConsumption', label: 'Water Consumption (m³)', color: 'bg-blue-500' },
    { key: 'recyclingPotential', label: 'Recycling Potential (%)', color: 'bg-green-500' },
  ];

  const maxValues = metrics.reduce((acc, metric) => {
    acc[metric.key] = Math.max(...results.map(r => r[metric.key as keyof LCAResults]));
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {metrics.map((metric) => (
        <div key={metric.key} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            {metric.label}
          </h3>
          <div className="space-y-2">
            {results.map((result, index) => {
              const value = result[metric.key as keyof LCAResults];
              const percentage = (value / maxValues[metric.key]) * 100;
              
              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center">
                    <span className="w-24 text-sm text-gray-500">Turbine {index + 1}</span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${metric.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-700">
                      {value.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComparisonChart;