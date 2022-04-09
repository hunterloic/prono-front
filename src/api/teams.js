const axios = require("axios");

const backendUrl = "http://localhost:8081";

export const getTeams = async (token) => {
  axios.defaults.baseURL = backendUrl;
  axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  const result = await axios.get(`/teams`);
  return result.data;
};

export const putTeams = async (teams) => {
  const result = await axios.put(`${backendUrl}/teams`, teams);
  return result.data;
};
