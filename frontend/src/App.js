import './App.css';
import RandomShapes from "./components/RandomShapes";
import Leaderboard from "./components/Leaderboard";
import { database } from './firebase';
import { runTransaction, ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';

function App({ timerValue }) {
  const [page, setPage] = useState("home");
  const [leader, setLeader] = useState("leader");
  const [bottomLinkText, setBottomLinkText] = useState("Leaderboard");
  const [emmettScore, setEmmettScore] = useState(0);
  const [landenScore, setLandenScore] = useState(0);
  const [harleyScore, setHarleyScore] = useState(0);
  const [peytonScore, setPeytonScore] = useState(0);
  const [gameReady, setGameReady] = useState(false);
  let adminView = false;

  const handleLeaderClick = (leader) => {
    setLeader(leader);
    setPage("game");
  };

  const gameOver = () => {
    console.log("in game over");
    setPage("endgame");
    setGameReady(false);
  };

  const handleBottomLinkClick = () => {
    if (page == "leaderboard"){
      setPage("home");
      setBottomLinkText("Leaderboard");
      adminView = false;
    } else {
      setPage("leaderboard");
      setBottomLinkText("Home");
      adminView = true;
    }
  };

  const returnToGame = () => {
    if (adminView){
      console.log("to leaderboard");
      setPage("leaderboard");
    } else {
      setPage("game");
    }
  };

  useEffect(() => {
    const usersRef = ref(database, '/Teams');
    const unsubscribe = onValue(usersRef, snapshot => {
        if (snapshot.exists()) {
            setEmmettScore(snapshot.val()['Emmett']);
            setLandenScore(snapshot.val()['Landen']);
            setHarleyScore(snapshot.val()['Harley']);
            setPeytonScore(snapshot.val()['Peyton']);
        }
    });

    const timerRef = ref(database, '/Timer');
    const timeUpdate = onValue(timerRef, snapshot => {
        if (snapshot.exists()) {
            let pulledSeconds = snapshot.val();
            console.log(pulledSeconds);
            if (pulledSeconds < timerValue){
              setGameReady(true);
            } else {
              setGameReady(false);
            }
            if (pulledSeconds == 1){
              gameOver();
            }
        }
    });

    return () => {
      unsubscribe();
      timeUpdate();
    };
  }, []);

  return (
    <div className="App">

      {page === "home" && (
        <div className="home">
          <div className="container">
            <div className="powerTxt">Power Activity</div>
            <div className="joinTeamTxt">Join a team:</div>
            <div className="leaders">
              <div className="leaderHolderPhone">
                <div className="leader emmett" onClick={() => handleLeaderClick("Emmett")}>
                  Emmett
                </div>
              </div>
              <div className="leaderHolderPhone">
                <div className="leader landen" onClick={() => handleLeaderClick("Landen")}>
                  Landen
                </div>
              </div>
              <div className="leaderHolderPhone">
                <div className="leader harley" onClick={() => handleLeaderClick("Harley")}>
                  Harley
                </div>
              </div>
              <div className="leaderHolderPhone">
                <div className="leader peyton" onClick={() => handleLeaderClick("Peyton")}>
                  Peyton
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {page === "game" && (
        gameReady ? (
          <RandomShapes Leader={leader} />
        ) : (
          <div class="waiting">
            Waiting for admin to start game...
          </div>
        )
      )}


      {page === "leaderboard" && (
        <Leaderboard />
      )}

      {page === "endgame" && (
        <div className="gameOverScreen">
          <div>
            <div className="gameOverTxt">Game Over!</div>
            <div className="winnerTxt">
              {(emmettScore > landenScore && emmettScore > harleyScore && emmettScore > peytonScore) && "Team Emmett Wins!"}
              {(landenScore > emmettScore && landenScore > harleyScore && landenScore > peytonScore) && "Team Landen Wins!"}
              {(harleyScore > emmettScore && harleyScore > landenScore && harleyScore > peytonScore) && "Team Harley Wins!"}
              {(peytonScore > emmettScore && peytonScore > landenScore && peytonScore > harleyScore) && "Team Peyton Wins!"}
            </div>
            <div className="scoresTxt">Scores:</div>
            <div className="teamEndTxt emmettLB">Team Emmett: {emmettScore}</div>
            <div className="teamEndTxt landenLB">Team Landen: {landenScore}</div>
            <div className="teamEndTxt harleyLB">Team Harley: {harleyScore}</div>
            <div className="teamEndTxt peytonLB">Team Peyton: {peytonScore}</div>
            <div className="returnHolder">
              <div className="returnButton" onClick={returnToGame}>Return to Game Lobby</div>
            </div>
          </div>
        </div>
      )}

      {(page !== "endgame" && page !== "game") && (
        <div class="bottomLink" onClick={handleBottomLinkClick}>{bottomLinkText}</div>
      )}  

    </div>
  );
}

export default App;