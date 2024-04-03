import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { runTransaction, ref } from 'firebase/database';

const RandomShapes = ({ Leader }) => {
  const [circlePosition, setCirclePosition] = useState({ top: 50, left: 50, show: true });
  const [trianglePosition, setTrianglePosition] = useState({ top: 150, left: 150, show: true });
  const [squarePosition, setSquarePosition] = useState({ top: 250, left: 250, show: true });
  const [rectanglePosition, setRectanglePosition] = useState({ top: 350, left: 350, show: true });

  const updatePositionsAndShow = () => {
    setCirclePosition({ ...generateRandomPosition(), show: true });
    setTrianglePosition({ ...generateRandomPosition(), show: true });
    setSquarePosition({ ...generateRandomPosition(), show: true });
    setRectanglePosition({ ...generateRandomPosition(), show: true });
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
    const interval = setInterval(updatePositionsAndShow, 1500); 
    return () => clearInterval(interval);
  }, []);

  const handleClick = async (shape, pointValue) => {
    const scoreRef = ref(database, `/Teams/${Leader}`);
    await runTransaction(scoreRef, (currentScore) => {
        if (currentScore === null) {
          return 1; 
        } else {
          return currentScore + pointValue; 
        }
      });

    // Hiding the shape based on the shape type clicked
    if (shape === 'circle') setCirclePosition(prev => ({ ...prev, show: false }));
    if (shape === 'triangle') setTrianglePosition(prev => ({ ...prev, show: false }));
    if (shape === 'square') setSquarePosition(prev => ({ ...prev, show: false }));
    if (shape === 'rectangle') setRectanglePosition(prev => ({ ...prev, show: false })); // Hide rectangle

    console.log("+", pointValue);
  };

  return (
    <div
      id="shapes-container"
      style={{ position: 'relative', height: '100vh', width: '100vw', backgroundColor: '#f0f0f0' }}
    >
      {circlePosition.show && (
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
          onClick={() => handleClick('circle', 1)}
        />
      )}
      {trianglePosition.show && (
        <div
          style={{
            position: 'absolute',
            top: `${trianglePosition.top}px`,
            left: `${trianglePosition.left}px`,
            width: '0',
            height: '0',
            borderLeft: '50px solid transparent',
            borderRight: '50px solid transparent',
            borderBottom: '100px solid green',
            cursor: 'pointer',
          }}
          onClick={() => handleClick('triangle', 2)}
        />
      )}
      {squarePosition.show && (
        <div
          style={{
            position: 'absolute',
            top: `${squarePosition.top}px`,
            left: `${squarePosition.left}px`,
            width: '100px',
            height: '100px',
            backgroundColor: 'red',
            cursor: 'pointer',
          }}
          onClick={() => handleClick('square', 2)}
        />
      )}
      {rectanglePosition.show && (
        <div
          style={{
            position: 'absolute',
            top: `${rectanglePosition.top}px`,
            left: `${rectanglePosition.left}px`,
            width: '150px', 
            height: '50px', 
            backgroundColor: 'orange',
            cursor: 'pointer',
          }}
          onClick={() => handleClick('rectangle', 4)}
        />
      )}
    </div>
  );
};

export default RandomShapes;
