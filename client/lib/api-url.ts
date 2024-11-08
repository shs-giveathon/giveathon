export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production' ? 'https://api.shsgiveathon.com' : 'http://127.0.0.1:5000';
};
