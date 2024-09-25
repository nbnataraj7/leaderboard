export interface Team {
  id: string;
  name: string;
  score?: number;
  stages: StageStatus[];
}

export interface StageStatus {
  stage: number;
  timeSpent: number;
}

export interface Leaderboard {
  teams: Team[];
  //additional metadata about leaderboard
}
