export interface Team {
  progressId: number;
  teamName: string;
  timeBetweenCreationAndUpdate: number;
  stage1Completed: boolean;
  stage1TimeTaken: number;
  stage2Unlocked: boolean;
  stage2Completed: boolean;
  stage2TimeTaken: number;
  stage3Unlocked: boolean;
  stage3Completed: boolean;
  stage3TimeTaken: number;
  stage4Unlocked: boolean;
  stage4Completed: boolean;
  stage4TimeTaken: number;
  createdDate: string;
  modifiedDate: string;
}

export interface StageStatus {
  stage: number;
  timeSpent: number;
}

export interface TeamDTO {
  [key: string]: Team[];
}

export interface Leaderboard {
  teams: Team[];
}

export interface LeaderboardDTO {
  success: boolean;
  message: string;
  data: TeamDTO;
}
