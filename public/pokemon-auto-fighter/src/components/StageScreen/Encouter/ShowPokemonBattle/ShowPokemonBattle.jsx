import React, { useState, useEffect } from 'react';
import LifeSpeedBar from '../../../ui/fightUi/LifeSpeedBar/LifeSpeedBar';

const ShowPokemonBattle = ({
  pokemonInstance,
  handleAttack,
  decreaseEnemyPokemonHp,
  hp,
}) => {
  const { speed } = pokemonInstance;
  const pokemonInstanceSlot = [pokemonInstance.slot, pokemonInstance.isAlly];
  // const pokemonInstanceIsAlly = pokemonInstance.isAlly;
  // const instanceData = [pokemonInstanceSlot, pokemonInstanceIsAlly];

  //const [hp, setHp] = useState(pokemonInstance.hp);

  const [isPokemonDead, setIsPokemonDead] = useState(false);

  const handlePokemonDead = () => {
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
            onAttack={() => {
              handleAttack(pokemonInstanceSlot);
              decreaseEnemyPokemonHp(); // Appeler la fonction reçue en tant que prop
            }} // Assurez-vous d'inclure cette ligne
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
