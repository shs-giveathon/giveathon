export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:5000';
};
