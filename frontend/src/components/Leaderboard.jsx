import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
    const [emmettScore, setEmmettScore] = useState(0);
    const [landenScore, setLandenScore] = useState(0);
    const [harleyScore, setHarleyScore] = useState(0);
    const [peytonScore, setPeytonScore] = useState(0);

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