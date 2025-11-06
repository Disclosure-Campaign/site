import React from 'react';
import Map from 'components/map';

const MapPage = () => {
  return (
    <div className="h-screen w-full bg-gray-100">
      <div className="flex h-full">
        <div className="flex-1 relative">
          <Map />
          <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-2">Campaign Finance Map</h1>
            <p className="text-sm text-gray-600">Displaying nationwide campaign finance data</p>
          </div>
        </div>
        <div className="w-80 bg-white shadow-lg p-4 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-2">Data Layers</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Campaign Contributions</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Campaign Expenditures</span>
                </label>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Time Period</h2>
              <select className="w-full border rounded p-2">
                <option>2024 Election Cycle</option>
                <option>2022 Election Cycle</option>
              </select>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Visualization</h2>
              <select className="w-full border rounded p-2">
                <option>Choropleth</option>
                <option>Heat Map</option>
                <option>Point Density</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;