import React, { useState, useEffect } from "react";
import './App.css';
import { useTimer } from "react-timer-hook";
import { database } from './firebase';
import { runTransaction, ref } from 'firebase/database';

function Admin({ timerValue, expiryTimestamp }) {
    // timer values
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => pause(),
    });

    const startGame = async () => {
        resume();
        const scoreRef = ref(database, `/Timer`);
        await runTransaction(scoreRef, (currentTime) => {
            return timerValue;
        });
        const emmettRef = ref(database, `/Teams/Emmett`);
        await runTransaction(emmettRef, (currentScore) => {
            return 0;
        });
        const peytonRef = ref(database, `/Teams/Peyton`);
        await runTransaction(peytonRef, (currentScore) => {
            return 0;
        });
        const harleyRef = ref(database, `/Teams/Harley`);
        await runTransaction(harleyRef, (currentScore) => {
            return 0;
        });
        const landenRef = ref(database, `/Teams/Landen`);
        await runTransaction(landenRef, (currentScore) => {
            return 0;
        });
    };

    useEffect(() => {
        if (!(minutes == 0 && seconds == 0)){
            const scoreRef = ref(database, `/Timer`);
            runTransaction(scoreRef, (currentTime) => {
                return currentTime - 1;
            });
        } else {
            const scoreRef = ref(database, `/Timer`);
            runTransaction(scoreRef, (currentTime) => {
                return timerValue;
            });
        }
    }, [seconds]);

    useEffect(() => {
        pause();
    }, []);

    return (
        <div className="App">
            <div onClick={startGame}>Start Game</div>
        </div>
    );
}

export default Admin;