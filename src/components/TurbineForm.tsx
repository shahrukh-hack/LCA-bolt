import React, { useState } from 'react';
import { TurbineData } from '../types';
import { Wind, Truck, Tools, Recycle } from 'lucide-react';

interface TurbineFormProps {
  onSubmit: (data: TurbineData) => void;
}

const TurbineForm: React.FC<TurbineFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TurbineData>({
    model: '',
    capacity: 2.5,
    rotorDiameter: 90,
    hubHeight: 80,
    manufacturingEnergy: 0,
    transportDistance: 0,
    transportMode: 'road',
    maintenanceFrequency: 2,
    operationalLife: 20,
    decommissioningMethod: 'recycling',
    materials: {
      steel: 0,
      fiberglass: 0,
      copper: 0,
      aluminum: 0,
      concrete: 0,
      rareEarth: 0,
      plastic: 0,
      electronics: 0
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleMaterialChange = (material: keyof TurbineData['materials'], value: number) => {
    setFormData(prev => ({
      ...prev,
      materials: {
        ...prev.materials,
        [material]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Specifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Wind className="h-5 w-5 mr-2 text-blue-500" />
          Basic Specifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Turbine Model
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., V90-2.5MW"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity (MW)
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rotor Diameter (m)
            </label>
            <input
              type="number"
              value={formData.rotorDiameter}
              onChange={(e) => setFormData(prev => ({ ...prev, rotorDiameter: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hub Height (m)
            </label>
            <input
              type="number"
              value={formData.hubHeight}
              onChange={(e) => setFormData(prev => ({ ...prev, hubHeight: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Manufacturing & Transport */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Truck className="h-5 w-5 mr-2 text-green-500" />
          Manufacturing & Transport
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Manufacturing Energy (MWh)
            </label>
            <input
              type="number"
              value={formData.manufacturingEnergy}
              onChange={(e) => setFormData(prev => ({ ...prev, manufacturingEnergy: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transport Distance (km)
            </label>
            <input
              type="number"
              value={formData.transportDistance}
              onChange={(e) => setFormData(prev => ({ ...prev, transportDistance: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transport Mode
            </label>
            <select
              value={formData.transportMode}
              onChange={(e) => setFormData(prev => ({ ...prev, transportMode: e.target.value as TurbineData['transportMode'] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="road">Road</option>
              <option value="rail">Rail</option>
              <option value="sea">Sea</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Operation & Maintenance */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Tools className="h-5 w-5 mr-2 text-orange-500" />
          Operation & Maintenance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maintenance Frequency (per year)
            </label>
            <input
              type="number"
              value={formData.maintenanceFrequency}
              onChange={(e) => setFormData(prev => ({ ...prev, maintenanceFrequency: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Operational Life (years)
            </label>
            <input
              type="number"
              value={formData.operationalLife}
              onChange={(e) => setFormData(prev => ({ ...prev, operationalLife: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Materials */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Recycle className="h-5 w-5 mr-2 text-purple-500" />
          Materials (tons)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(formData.materials).map(([material, value]) => (
            <div key={material}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {material}
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => handleMaterialChange(material as keyof TurbineData['materials'], Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                step="0.1"
              />
            </div>
          ))}
        </div>
      </div>

      {/* End of Life */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Recycle className="h-5 w-5 mr-2 text-red-500" />
          End of Life
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Decommissioning Method
          </label>
          <select
            value={formData.decommissioningMethod}
            onChange={(e) => setFormData(prev => ({ ...prev, decommissioningMethod: e.target.value as TurbineData['decommissioningMethod'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="recycling">Recycling</option>
            <option value="landfill">Landfill</option>
            <option value="remanufacturing">Remanufacturing</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Calculate LCA & MFA
      </button>
    </form>
  );
};

export default TurbineForm;