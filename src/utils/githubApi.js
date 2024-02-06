import axios from "axios";

const BASE_URL = "https://api.github.com";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

export const getData = (repoUrl) => {
  const repoPath = repoUrl.split("/").slice(-2).join("/");
  return axiosInstance.get(`/repos/${repoPath}`);
};

export const getIssues = (repoUrl, state = "all") => {
  const repoPath = repoUrl.split("/").slice(-2).join("/");
  return axiosInstance.get(`/repos/${repoPath}/issues`, {
    params: {
      state,
    },
  });
};
