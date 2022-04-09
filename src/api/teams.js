const axios = require("axios");

const backendUrl = "http://localhost:8081";

export const getTeams = async () => {
  const result = await axios.get(`${backendUrl}/teams`);
  return result.data;
};

export const putTeams = async (teams) => {
  const result = await axios.put(`${backendUrl}/teams`, teams);
  return result.data;
};
