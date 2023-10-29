export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production' ? 'https://api.shsgiveathon.com' : 'http://localhost:5000';
};
