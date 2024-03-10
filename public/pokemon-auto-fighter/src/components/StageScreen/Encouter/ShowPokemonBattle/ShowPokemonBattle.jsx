import React, { useState, useEffect } from 'react';
import LifeSpeedBar from '../../../ui/fightUi/LifeSpeedBar/LifeSpeedBar';

const ShowPokemonBattle = ({ pokemonInstance, handleAttack }) => {
  const { speed } = pokemonInstance;
  const pokemonInstanceSlot = pokemonInstance.slot;
  const [hp, setHp] = useState(pokemonInstance.hp);

  const decreaseHp = (amount) => {
    setHp((prevHp) => {
      const newHp = Math.max(prevHp - amount, 0);
      return newHp;
    });
  };

  useEffect(() => {
    // Decrease HP periodically (every 1000 milliseconds)

    const hpInterval = setInterval(() => {
      decreaseHp(9); // Decrease HP by 10, adjust as needed
    }, 2000);
    return () => clearInterval(hpInterval);
  }, []);
  // const handleAttackClick = () => {
  //   handleAttack(pokemonInstance.slot);
  //   // Vous pouvez également appeler applyDamage directement ici si nécessaire
  // };

  const [isPokemonDead, setIsPokemonDead] = useState(false);

  const handlePokemonDead = () => {
    //console.log('Pokemon is dead!');

    setIsPokemonDead(true);
  };

  useEffect(() => {
    if (hp <= 0) {
      handlePokemonDead();
    }
  }, [hp]);

  if (isPokemonDead) {
    return null;
  }
  return (
    <div className="pokemon-battle-container">
      {!isPokemonDead && (
        <>
          <LifeSpeedBar
            maxHp={pokemonInstance.maxHp}
            hp={hp}
            speed={speed}
            onDead={handlePokemonDead}
            onAttack={() => handleAttack(pokemonInstance.slot)}
            //onAttack={handleAttackClick}
          />
          <img
            className="pokemon-image"
            src={pokemonInstance.frontSprite}
            alt={`Front Sprite of ${pokemonInstance.name}`}
          />
        </>
      )}
    </div>
  );
};

export default ShowPokemonBattle;
