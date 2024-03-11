import React, { useState, useEffect } from 'react';

const LifeSpeedBar = ({
  maxHp,
  hp,
  speed,
  onDead,
  onAttack,
  decreaseEnemyPokemonHp,
}) => {
  const [lifeWidth, setLifeWidth] = useState((hp / maxHp) * 100);
  const [speedWidth, setSpeedWidth] = useState((speed / 100) * 30);

  useEffect(() => {
    setLifeWidth((hp / maxHp) * 100);
    if ((hp / maxHp) * 100 <= 0) {
      onDead();
    }
  }, [hp, maxHp, lifeWidth]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSpeedWidth((prevWidth) => {
        let newSpeed = prevWidth + 20;
        if (newSpeed <= 100) {
          return newSpeed;
        }
        if (newSpeed >= 100) {
          onAttack();
          // decreaseEnemyPokemonHp();
          {
            /* Ajoutez cette ligne */
          }
          return newSpeed % 100;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
