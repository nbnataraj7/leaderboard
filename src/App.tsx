import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Team } from "./models";
//import { mockData } from "./mocks/mockData";
import { fetchLeaderboard } from "./api";
import { toCompleteClass, toMinutes, toUnlocked } from "./utils";
// import { fetchLeaderboard } from "./api";

//Update the time interval here
const LEADERBOARD_UPDATE_TIMER = 10000;

function App() {
  const [leaderboard, setLeaderboard] = useState<Team[]>();
  const [isFetching, setIsFetching] = useState(false);

  const updateLeaderBoard = useCallback((teams: Team[]) => {
    setLeaderboard(teams);
  }, []);

  const initLeaderBoard = useCallback(async () => {
    fetchLeaderboard().then((teams) => {
      setIsFetching(false);
      if (teams && teams.length) updateLeaderBoard(teams);
    });
  }, [updateLeaderBoard]);

  useEffect(() => {
    setInterval(() => {
      //Call the API to get the latest leaderboard -
      setIsFetching(true);
      initLeaderBoard();
    }, LEADERBOARD_UPDATE_TIMER);
  }, [initLeaderBoard]);

  useEffect(() => {
    initLeaderBoard();
  }, [initLeaderBoard]);

  return (
    <>
      <div className="container">
        {isFetching && <div className="loader"></div>}
        <h1 className="title">Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stage 1</th>
              <th>Stage 2</th>
              <th>Stage 3</th>
              <th>Stage 4</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.map((team) => (
              <tr key={team.progressId}>
                <td className="team-title">{team.teamName}</td>
                <td className={toCompleteClass(team.stage1Completed)}>
                  <p>{toMinutes(team.stage1TimeTaken)}</p>
                </td>
                <td className={toCompleteClass(team.stage2Completed)}>
                  <p>{toUnlocked(team.stage2Unlocked, team.stage2Completed)}</p>
                  {team.stage2Unlocked && (
                    <p>{toMinutes(team.stage2TimeTaken)}</p>
                  )}
                </td>
                <td className={toCompleteClass(team.stage3Completed)}>
                  <p>{toUnlocked(team.stage3Unlocked, team.stage3Completed)}</p>
                  {team.stage3Unlocked && (
                    <p>{toMinutes(team.stage3TimeTaken)}</p>
                  )}
                </td>
                <td className={toCompleteClass(team.stage4Completed)}>
                  <p>{toUnlocked(team.stage4Unlocked, team.stage4Completed)}</p>
                  {team.stage4Unlocked && (
                    <p>{toMinutes(team.stage4TimeTaken)}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
