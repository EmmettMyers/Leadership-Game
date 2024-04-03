import React, { useState } from "react";
import './App.css';
import RandomShapes from "./components/RandomShapes";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [page, setPage] = useState("home");
  const [leader, setLeader] = useState("leader");
  const [bottomLinkText, setBottomLinkText] = useState("Leaderboard");

  const handleLeaderClick = (leader) => {
    setPage("game");
  };

  const handleBottomLinkClick = () => {
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
        <RandomShapes />
      )}

      {page === "leaderboard" && (
        <Leaderboard />
      )}

      <div class="bottomLink" onClick={handleBottomLinkClick}>{bottomLinkText}</div>
    </div>
  );
}

export default App;