import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { runTransaction, ref, onValue } from 'firebase/database';

const Leaderboard = () => {
    const [emmettScore, setEmmettScore] = useState(0);
    const [landenScore, setLandenScore] = useState(0);
    const [harleyScore, setHarleyScore] = useState(0);
    const [peytonScore, setPeytonScore] = useState(0);

  useEffect(() => {
    const usersRef = ref(database, '/Teams');
    const unsubscribe = onValue(usersRef, snapshot => {
      if (snapshot.exists()) {
        setEmmettScore(snapshot.val()['Emmett']);
        setLandenScore(snapshot.val()['Landen']);
        setHarleyScore(snapshot.val()['Harley']);
        setPeytonScore(snapshot.val()['Peyton']);
      } else {
        console.log("none");
      }
    });

    return () => unsubscribe();
  }, []);



    return (
        <div className="leaderboardPage">

            <div className="titleBoxHolder">
                <div className="leaderTitleHolder">
                    <div className="leaderTitle emmettLB">
                        Emmett
                    </div>
                    <div className="leaderTitle landenLB">
                        Landen
                    </div>
                    <div className="leaderTitle harleyLB">
                        Harley
                    </div>
                    <div className="leaderTitle peytonLB">
                        Peyton
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Leaderboard;