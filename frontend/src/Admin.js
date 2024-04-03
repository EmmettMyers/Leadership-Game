import React, { useState } from "react";
import './App.css';

function Admin() {
    const startGame = () => {
        // reset scores
        // reset timer
    };

    return (
        <div className="App">
            <div onClick={startGame}>Start Game</div>
        </div>
    );
}

export default Admin;