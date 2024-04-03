import React, { useState } from "react";
import './App.css';

function App() {
  const [page, setPage] = useState("home");
  const [leader, setLeader] = useState("leader");

  const handleLeaderClick = (leader) => {
    setPage("game");
  };

  const handleLeaderboardClick = () => {
    setPage("leaderboard");
  };

  return (
    <div className="App">

      {page === "home" && (
        <div className="home">
          <div className="container">
            <div className="joinTeamTxt">Join a team:</div>
            <div className="leaders">
              <div className="leader emmett" onClick={() => handleLeaderClick("Emmett")}>
                Emmett
              </div>
              <div className="leader landen" onClick={() => handleLeaderClick("Landen")}>
                Landen
              </div>
              <div className="leader harley" onClick={() => handleLeaderClick("Harley")}>
                Harley
              </div>
              <div className="leader peyton" onClick={() => handleLeaderClick("Peyton")}>
                Peyton
              </div>
            </div>
          </div>
        </div>
      )}

      {page === "game" && (
        <div className="game">

        </div>
      )}

      {page === "leaderboard" && (
        <div className="leaderboard">

        </div>
      )}

      <div class="leaderboardLink" onClick={handleLeaderboardClick}>Leaderboard</div>
    </div>
  );
}

export default App;