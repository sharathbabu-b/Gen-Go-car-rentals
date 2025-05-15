import axios from 'axios';

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY; // Store in .env

export const forwardGeocode = async (address) => {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${GEOAPIFY_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const reverseGeocode = async (lat, lon) => {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

// import axios from 'axios';

// const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY; // Store in .env

// export const forwardGeocode = async (address) => {
//   const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${GEOAPIFY_API_KEY}`;
//   const response = await axios.get(url);
//   return response.data;
// };

// export const reverseGeocode = async (lat, lon) => {
//   const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`;
//   const response = await axios.get(url);
//   return response.data;
// };

// // ✅ Test reverse geocoding with specific coordinates
// const testReverseGeocode = async () => {
//   const lat = 12.9520723;
//   const lon = 77.5644346;

//   try {
//     const data = await reverseGeocode(lat, lon);
//     if (data.features && data.features.length > 0) {
//       console.log('Formatted Address:', data.features[0].properties.formatted);
//     } else {
//       console.log('No address found for these coordinates.');
//     }
//   } catch (error) {
//     console.error('Geoapify reverse geocode error:', error.response?.data || error.message);
//   }
// };

// // Uncomment the line below to test when running this file directly
// // testReverseGeocode();
