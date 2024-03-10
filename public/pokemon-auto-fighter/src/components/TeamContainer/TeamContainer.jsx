// TeamContainer.js
import React from 'react';
import PokemonInventory from '../PokemonInventory/PokemonInventory';

const TeamContainer = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Mon Équipe Pokémon</h2>
      <PokemonInventory />
      {/* Ajoutez d'autres éléments de votre équipe Pokémon ici si nécessaire */}
    </div>
  );
};

export default TeamContainer;
