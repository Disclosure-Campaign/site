export const ARCGIS_API_KEY = process.env.REACT_APP_ARCGIS_API_KEY;

export const DEFAULT_MAP_CONFIG = {
  basemap: "gray-vector",
  center: [-98.5795, 39.8283], // Center of US
  zoom: 4
};

export const MAP_LAYER_TYPES = {
  CONTRIBUTIONS: 'contributions',
  EXPENDITURES: 'expenditures',
  DISTRICTS: 'districts'
};

export const VISUALIZATION_TYPES = {
  CHOROPLETH: 'choropleth',
  HEAT: 'heat',
  POINT: 'point'
};