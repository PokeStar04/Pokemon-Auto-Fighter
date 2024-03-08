import React, { useState, useEffect } from 'react';

const LifeSpeedBar = ({ maxHp, hp, speed, onDead, onAttack, decreaseHp }) => {
  const [lifeWidth, setLifeWidth] = useState((hp / maxHp) * 100);
  const [speedWidth, setSpeedWidth] = useState(20);

  useEffect(() => {
    setLifeWidth((hp / maxHp) * 100);
    if (hp <= 0) {
      onDead();
    }
  }, [maxHp, hp, onDead]);

  useEffect(() => {
    // Decrease HP periodically (every 1000 milliseconds)
    const hpInterval = setInterval(() => {
      decreaseHp(10); // Decrease HP by 10, adjust as needed
    }, 1000);
    return () => clearInterval(hpInterval);
  }, [decreaseHp]);

  useEffect(() => {
    // Increase speed bar and update life bar width periodically
    const interval = setInterval(() => {
      setLifeWidth((newHp) => (newHp / maxHp) * 100);

      setSpeedWidth((prevSpeedWidth) => {
        const newWidth = prevSpeedWidth + 30 * (speed / 100);
        if (newWidth >= 100) {
          onAttack();
          return newWidth - 100;
        }
        return newWidth;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [speed, onAttack, maxHp]);

  return (
    <div className="relative w-24 h-6 bg-gray-200 border border-black overflow-hidden">
      <div
        className="h-3/5 bg-green-500"
        style={{ width: `${lifeWidth}%` }}
      ></div>
      <div
        className="h-2/5 bg-blue-500"
        style={{ width: `${speedWidth}%` }}
      ></div>
    </div>
  );
};

export default LifeSpeedBar;
