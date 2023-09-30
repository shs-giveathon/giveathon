export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production' ? 'prod-url' : 'http://localhost:5000';
};
