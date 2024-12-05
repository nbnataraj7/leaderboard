import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Team } from "./models";
import { fetchLeaderboard } from "./api";
import { toCompleteClass, toMinutes, toUnlocked } from "./utils";

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

  const getMedal = useCallback((team: Team) => {
    if (team.stage4Completed)
      return (
        <div className="badge">
          <img src="/success.png" height={"55px"} />
        </div>
      );
    else if (team.stage3Completed)
      return <img className="badge" src="/2nd-place.png" height={"50px"} />;
    else if (team.stage2Completed)
      return <img className="badge" src="/3rd-place.png" height={"50px"} />;
    else return "";
  }, []);

  const getWinnerClass = useCallback((team: Team) => {
    if (team.stage4Completed) return "winner";
    else if (team.stage3Completed) return "second";
    else if (team.stage2Completed) return "third";
    else if (team.stage1Completed) return "fourth";
    else return "";
  }, []);

  return (
    <>
      <div className="container">
        {isFetching && <div className="loader"></div>}
        <div className="header">
          <img src="/badge.png" height={"50px"} />
          <h1 className="title">Leaderboard</h1>
          <img src="/badge.png" height={"50px"} />
        </div>
        <div className="leader-container">
          <div className="leader-heading">
            <div className="heading">Team Name</div>
            <div className="heading">Stage 1</div>
            <div className="heading">Stage 2</div>
            <div className="heading">Stage 3</div>
            <div className="heading">Stage 4</div>
          </div>

          {leaderboard?.map((team) => (
            <div
              className={getWinnerClass(team) + " leaders-row"}
              key={team.progressId}
            >
              <div className="team-title row">
                {getMedal(team)}
                {team.teamName}
              </div>
              <div className={toCompleteClass(team.stage1Completed) + " row"}>
                <p>{toMinutes(team.stage1TimeTaken)}</p>
              </div>
              <div className={toCompleteClass(team.stage2Completed) + " row"}>
                <p>{toUnlocked(team.stage2Unlocked, team.stage2Completed)}</p>
                {team.stage2Unlocked && (
                  <p>{toMinutes(team.stage2TimeTaken)}</p>
                )}
              </div>
              <div className={toCompleteClass(team.stage3Completed) + " row"}>
                <p>{toUnlocked(team.stage3Unlocked, team.stage3Completed)}</p>
                {team.stage3Unlocked && (
                  <p>{toMinutes(team.stage3TimeTaken)}</p>
                )}
              </div>
              <div className={toCompleteClass(team.stage4Completed) + " row"}>
                <p>{toUnlocked(team.stage4Unlocked, team.stage4Completed)}</p>
                {team.stage4Unlocked && (
                  <p>{toMinutes(team.stage4TimeTaken)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <footer>
        <a
          href="https://www.flaticon.com/free-icons/second-place"
          title="second place icons"
        >
          Second place icons created by Freepik - Flaticon
        </a>
        <a href="https://www.flaticon.com/free-icons/2nd-place" title="2nd place icons">2nd place icons created by Muhammad Atif - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/3rd-place" title="3rd place icons">3rd place icons created by Md Tanvirul Haque - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/medal" title="medal icons">Medal icons created by Handicon - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/2nd" title="2nd icons">2nd icons created by Shaharea - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/2nd-place" title="2nd place icons">2nd place icons created by Md Tanvirul Haque - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/2nd-place" title="2nd place icons">2nd place icons created by Md Tanvirul Haque - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/3rd-place" title="3rd place icons">3rd place icons created by Md Tanvirul Haque - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/unlock" title="unlock icons">Unlock icons created by Freepik - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/lock" title="lock icons">Lock icons created by Freepik - Flaticon</a>
      </footer> */}
    </>
  );
}

export default App;
