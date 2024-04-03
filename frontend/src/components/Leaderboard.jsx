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
            console.log("test");
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
        <div className="leaderboard">
            <div className="leaderHolder">
                <div>
                    <div className={`bar emmett`} style={{ height: `${emmettScore * 1}px` }}></div>
                    <div className="leaderTitle emmettLB">
                        Team<br/>Emmett
                    </div>
                </div>
                <div>
                    <div className={`bar landen`} style={{ height: `${landenScore * 1}px` }}></div>
                    <div className="leaderTitle landenLB">
                        Team<br/>Landen
                    </div>
                </div>
                <div>
                    <div className={`bar harley`} style={{ height: `${harleyScore * 1}px` }}></div>
                    <div className="leaderTitle harleyLB">
                        Team<br/>Harley
                    </div>
                </div>
                <div>
                    <div className={`bar peyton`} style={{ height: `${peytonScore * 1}px` }}></div>
                    <div className="leaderTitle peytonLB">
                        Team<br/>Peyton
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;