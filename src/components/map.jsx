// import React, { useEffect, useRef, useState } from 'react';
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
// import esriConfig from "@arcgis/core/config";
// import Basemap from "@arcgis/core/Basemap";
// import * as statesData from '../data/states.json';
// import { ARCGIS_API_KEY, DEFAULT_MAP_CONFIG } from '../config/arcgis';

// esriConfig.apiKey = ARCGIS_API_KEY;

// console.log('ArcGIS configuration:', {
//   apiKey: ARCGIS_API_KEY ? 'Set' : 'Not set',
//   baseUrl: esriConfig.portalUrl
// });

// const ArcGISMap = () => {
//   const mapDiv = useRef(null);
//   const [selectedState, setSelectedState] = useState(null);

//   useEffect(() => {
//     if (!mapDiv.current) return;

//     let view, url;
    
//     const initializeMap = async () => {
//       try {
//         const blob = new Blob([JSON.stringify(statesData)], {
//           type: "application/json"
//         });

//         var url = URL.createObjectURL(blob);

//         const statesLayer = new GeoJSONLayer({
//           url,
//           outFields: ["name"],
//           opacity: 0.8,
//           renderer: {
//             type: "simple",
//             symbol: {
//               type: "simple-fill",
//               color: [255, 255, 255, 0.1],
//               outline: {
//                 color: [70, 70, 70],
//                 width: 1
//               }
//             }
//           },
//           popupEnabled: false
//         });

//         const map = new Map({
//           basemap: "arcgis-topographic",
//           layers: [statesLayer]
//         });

//         view = new MapView({
//           container: mapDiv.current,
//           map,
//           center: DEFAULT_MAP_CONFIG.center,
//           zoom: DEFAULT_MAP_CONFIG.zoom,
//           constraints: {
//             rotationEnabled: false
//           },
//           ui: {
//             components: ['zoom', 'compass', 'attribution']
//           }
//         });

//         await view.when();
//         console.log('Map view loaded successfully');

//         await statesLayer.load().catch(err => {
//           console.error('Error loading states layer:', err);
//           URL.revokeObjectURL(url);
//           throw err;
//         });

//         // URL.revokeObjectURL(url);

//         // view.whenLayerView(statesLayer).then((layerView) => {
//         //   let highlight;

//         //   view.on("pointer-move", async (event) => {
//         //     const screenPoint = {
//         //       x: event.x,
//         //       y: event.y
//         //     };

//         //     if (highlight) {
//         //       highlight.remove();
//         //       highlight = null;
//         //     }

//         //     const response = await view.hitTest(screenPoint);
//         //     const results = response.results;

//         //     if (results.length > 0 && results[0].graphic) {
//         //       const graphic = results[0].graphic;
//         //       highlight = layerView.highlight(graphic);
              
//         //       setSelectedState({
//         //         name: graphic.attributes.name,
//         //         postal: graphic.attributes.id
//         //       });
//         //     } else {
//         //       setSelectedState(null);
//         //     }
//         //   });
//         // });
//       } catch (error) {
//         console.error('Error initializing map:', error);

//         if (mapDiv.current) {
//           mapDiv.current.innerHTML = `
//             <div class="p-4 text-red-600">
//               <h3 class="font-bold">Error loading map</h3>
//               <p>${error.message}</p>
//               <p class="text-sm mt-2">Please check your API key configuration.</p>
//             </div>
//           `;
//         }
//       }
//     };

//     initializeMap();

//     return () => {
//       if (view) {
//         view.destroy();
//         URL.revokeObjectURL(url);
//       }
//     };
//   }, []);

//   return (
//     <div className="w-full h-full relative">
//       <div ref={mapDiv} className="w-full h-full"></div>
//       {selectedState && (
//         <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
//           <h3 className="text-lg font-bold">{selectedState.name}</h3>
//           <p className="text-sm text-gray-600">Click to view campaign finance data</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArcGISMap;