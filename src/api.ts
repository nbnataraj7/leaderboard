import axios from "axios";
import { Leaderboard } from "./models";

const instance = axios.create({
  baseURL: "https://nemetscheck.hackathon.com/api/",
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchLeaderboard = async () => {
  try {
    const response = await instance.get<Leaderboard>("/leaderboard");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
