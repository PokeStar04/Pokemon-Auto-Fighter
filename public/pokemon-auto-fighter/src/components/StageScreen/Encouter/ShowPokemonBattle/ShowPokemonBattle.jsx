import React, { useState, useEffect } from 'react';
import LifeSpeedBar from '../../../ui/fightUi/LifeSpeedBar/LifeSpeedBar';

const ShowPokemonBattle = ({
  pokemonInstance,
  handleAttack,
  updatedHp, // Utilisez updatedHp au lieu de hp
}) => {
  const { speed } = pokemonInstance;
  const pokemonInstanceSlot = [
    pokemonInstance.slot,
    pokemonInstance.isAlly,
    pokemonInstance.attack,
    pokemonInstance.hp,
  ];
  console.log('La vie de mon instance : ' + pokemonInstance.hp);
  const [isPokemonDead, setIsPokemonDead] = useState(false);

  const handlePokemonDead = () => {
    setIsPokemonDead(true);
  };

  useEffect(() => {
    // Mettez à jour l'état local lorsque updatedHp change
    if (updatedHp <= 0) {
      console.log('je suis mort ta mere');
      handlePokemonDead();
    }
  }, [updatedHp]);
  // useEffect(() => {
  //   // Fonction de rappel pour setInterval
  //   const intervalId = setInterval(() => {
  //     // Mettez à jour l'état local ou effectuez d'autres actions ici
  //     console.log(
  //       'mes hp :',
  //       pokemonInstance.hp + ' slot :' + pokemonInstance.slot,
  //     );
  //   }, 2000); // Intervalle de 2 secondes (2000 millisecondes)

  //   // Nettoyer l'intervalle lors du démontage du composant
  //   return () => clearInterval(intervalId);
  // }, [pokemonInstance]);

  if (isPokemonDead) {
    return null;
  }

  return (
    <div className="pokemon-battle-container">
      {!isPokemonDead && (
        <>
          <LifeSpeedBar
            maxHp={pokemonInstance.maxHp}
            hp={updatedHp}
            speed={speed}
            onDead={handlePokemonDead}
            onAttack={() => {
              handleAttack(pokemonInstanceSlot);
            }}
            updatedHp={updatedHp}
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
