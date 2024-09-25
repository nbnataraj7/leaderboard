import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Team } from "./models";
import { mockData } from "./mocks/mockData";
// import { fetchLeaderboard } from "./api";

//Update the time interval here
const LEADERBOARD_UPDATE_TIMER = 10000;

function App() {
  const [leaderboard, setLeaderboard] = useState<Team[]>();
  const [isFetching, setIsFetching] = useState(false);

  const updateLeaderBoard = useCallback(() => {
    setLeaderboard((prevLeaderBoard) =>
      (prevLeaderBoard || []).sort((a, b) => {
        return (
          a.stages.reduce((acc, stage) => acc + stage.timeSpent, 0) -
          b.stages.reduce((acc, stage) => acc + stage.timeSpent, 0)
        );
      })
    );
  }, []);

  useEffect(() => {
    setLeaderboard(mockData);

    setInterval(() => {
      //Call the API to get the latest leaderboard -
      // setIsFetching(true);
      // fetchLeaderboard().then((data) => {
      //   setIsFetching(false);
      //   if (data && data.teams && data.teams.length)
      //     updateLeaderBoard(data.teams);
      // });

      //Get rid of below statement once we have the API ready
      updateLeaderBoard();
    }, LEADERBOARD_UPDATE_TIMER);
  }, [updateLeaderBoard]);

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
              <tr key={team.id}>
                <td>{team.name}</td>
                {team.stages.map((stage) => (
                  <td key={stage.stage}>{stage.timeSpent}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
