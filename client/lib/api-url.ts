export const getApiUrl = () => {
  return process.env.NODE_ENV === 'production' ? 'https://api.shsgiveathon.com' : 'https://api.shsgiveathon.com';
};
