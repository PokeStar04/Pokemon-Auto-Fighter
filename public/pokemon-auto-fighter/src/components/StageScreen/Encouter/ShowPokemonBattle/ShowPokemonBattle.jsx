import React, { useState, useEffect } from 'react';
import LifeSpeedBar from '../../../ui/fightUi/LifeSpeedBar/LifeSpeedBar';

const ShowPokemonBattle = ({ pokemonInstance }) => {
  const { speed } = pokemonInstance;
  const [hp, setHp] = useState(pokemonInstance.hp);

  const decreaseHp = (amount) => {
    setHp((prevHp) => {
      const newHp = Math.max(prevHp - amount, 0);
      console.log(`New HP: ${newHp}`);
      return newHp;
    });
  };

  useEffect(() => {
    // Decrease HP periodically (every 1000 milliseconds)
    const hpInterval = setInterval(() => {
      decreaseHp(10); // Decrease HP by 10, adjust as needed
    }, 1000);
    return () => clearInterval(hpInterval);
  }, []);

  const maxHp = hp;
  const [isPokemonDead, setIsPokemonDead] = useState(false);

  const handleAttack = () => {
    console.log('Attack!'); // Logique de l'attaque à implémenter ici
  };

  const handlePokemonDead = () => {
    console.log('Pokemon is dead!');
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
            maxHp={maxHp}
            hp={hp}
            speed={speed}
            onDead={handlePokemonDead}
            onAttack={handleAttack}
            decreaseHp={decreaseHp}
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
