import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { runTransaction, ref } from 'firebase/database';

const RandomShapes = ({Leader}) => {
  const [circlePosition, setCirclePosition] = useState({ top: 50, left: 50 });
  const [trianglePosition, setTrianglePosition] = useState({ top: 150, left: 150 });
  const [squarePosition, setSquarePosition] = useState({ top: 250, left: 250 });

  const updatePositions = () => {
    setCirclePosition(generateRandomPosition());
    setTrianglePosition(generateRandomPosition());
    setSquarePosition(generateRandomPosition());
  };

  const generateRandomPosition = () => {
    const container = document.getElementById('shapes-container');
    if (container) {
      const maxTop = container.offsetHeight - 90; 
      const maxLeft = container.offsetWidth - 90; 
      const newTop = Math.random() * maxTop;
      const newLeft = Math.random() * maxLeft;
      return { top: newTop, left: newLeft };
    }
    return { top: 0, left: 0 }; 
  };

  useEffect(() => {
    const interval = setInterval(updatePositions, 2000); 
    return () => clearInterval(interval);
  }, []);

  const handleClick = async (pointValue) => {
    const scoreRef = ref(database, `/Teams/${Leader}`);
    await runTransaction(scoreRef, (currentScore) => {
        if (currentScore === null) {
          return 1; 
        } else {
          return currentScore + pointValue; 
        }
      });
    console.log("+", pointValue);
    };

  return (
    <div
      id="shapes-container"
      style={{ position: 'relative', height: '100vh', width: '100vw', backgroundColor: '#f0f0f0' }}
    >
      <button
        style={{
          position: 'absolute',
          top: `${circlePosition.top}px`,
          left: `${circlePosition.left}px`,
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: 'blue',
        }}
        onClick={() => handleClick(1)}
      />
      <div
        style={{
          position: 'absolute',
          top: `${trianglePosition.top}px`,
          left: `${trianglePosition.left}px`,
          width: '0',
          height: '0',
          borderLeft: '30px solid transparent',
          borderRight: '30px solid transparent',
          borderBottom: '60px solid green',
        }}
        onClick={() => handleClick(2)}
      />
      <div
        style={{
          position: 'absolute',
          top: `${squarePosition.top}px`,
          left: `${squarePosition.left}px`,
          width: '100px',
          height: '100px',
          backgroundColor: 'red',
        }}
        onClick={() => handleClick(3)}
      />
    </div>
  );
};

export default RandomShapes;
