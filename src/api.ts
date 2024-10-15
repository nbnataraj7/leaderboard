import axios from "axios";
import { LeaderboardDTO } from "./models";

const username = "system_user";
const pwd = "H@ckath0n@2024";

const instance = axios.create({
  baseURL:
    "https://hackathon.spacewell.com/api/v2/internal/events/hackathon/leaderboard",
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(username + ":" + pwd),
  },
});

export const fetchLeaderboard = async () => {
  try {
    const response = await instance.get<LeaderboardDTO>("");
    const keys = Object.keys(response.data.data);
    const teams = keys.map((key: string) => response.data.data[key][0]);
    return teams;
  } catch (error) {
    console.error(error);
  }
};
