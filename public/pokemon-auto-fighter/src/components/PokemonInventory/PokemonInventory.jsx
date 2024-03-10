import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard/PokemonCard.jsx';

const PokemonInventory = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/pokemonInventory/1',
        );
        setPokemonList(response.data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données des Pokémon',
          error,
        );
      }
    };

    fetchPokemonData();
  }, []);

  const moveCard = (fromIndex, toIndex) => {
    const updatedList = [...pokemonList];
    const [movedCard] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedCard);
    setPokemonList(updatedList);
  };

  const handleSelect = (index) => {
    const isSelected = selectedPokemon.includes(index);
    if (isSelected) {
      setSelectedPokemon(selectedPokemon.filter((i) => i !== index));
    } else {
      setSelectedPokemon([...selectedPokemon, index]);
    }
  };

  const getSelectedPokemonData = () => {
    const selectedData = selectedPokemon.map((index) => pokemonList[index]);
    console.log('Données des Pokémon sélectionnés :', selectedData);
    return selectedData;
  };

  const handleAddToTeam = async () => {
    try {
      // Assuming the ID of the user is hard-coded as 1 for now
      const userId = 1;
      const response = await axios.post(
        'http://localhost:3001/pokemonTeam/add',
        {
          teamInfo: {
            idPokemonInventory: getSelectedPokemonData().map(
              (pokemon) => pokemon.id,
            ),
            slot: 1, // Assuming slot 1 for demonstration, update as needed
          },
        },
      );

      console.log('Added to team:', response.data);
      // You can add further logic or update the UI as needed
    } catch (error) {
      console.error('Error adding Pokémon to the team:', error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          index={index}
          moveCard={moveCard}
          onSelect={handleSelect}
          isSelected={selectedPokemon.includes(index)}
        />
      ))}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Pokémon Sélectionnés</h2>
        <ul>
          {getSelectedPokemonData().map((selectedPokemon) => (
            <li key={selectedPokemon.id}>{selectedPokemon.name}</li>
          ))}
        </ul>
        <button onClick={handleAddToTeam}>Ajouter à l'équipe</button>
      </div>
    </div>
  );
};

export default PokemonInventory;
