import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from '../../../models/pokemonModel';
import ShowPokemonBattle from './ShowPokemonBattle/ShowPokemonBattle';

const Encounter = ({ encountersData }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [
    pokemonInstancesForCurrentEncounter,
    setPokemonInstancesForCurrentEncounter,
  ] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Créez un tableau de promesses pour les requêtes individuelles
        const pokemonRequests = encountersData.map((encounter) =>
          axios.get(`http://localhost:3001/pokemonEncounters/${encounter.id}`),
        );

        // Attendez que toutes les requêtes soient terminées
        const responses = await Promise.all(pokemonRequests);

        // Extrayez les données de chaque réponse
        const pokemonData = responses.map((response) => response.data);

        setPokemonData(pokemonData);
      } catch (error) {
        console.error('Error while fetching Pokemon data: ', error);
      }
    };

    if (encountersData.length > 0) {
      fetchPokemonData();
    }
  }, [encountersData]);

  useEffect(() => {
    // Mettez à jour les instances de Pokémon chaque fois que le stage change
    setPokemonInstancesForCurrentEncounter(
      pokemonData[currentStage]?.map(
        (data) =>
          new Pokemon(
            data.id,
            data.name,
            data.type1,
            data.type2,
            data.hp,
            data.attack,
            data.defence,
            data.specialAttack,
            data.specialDefence,
            data.speed,
            data.experience,
            data.rarity,
            data.frontSprite,
            data.backSprite,
          ),
      ) || [],
    );
  }, [pokemonData, currentStage]);

  // Utilisez les données de PokemonData pour afficher ce que vous voulez
  // ...
  const handleNextStage = () => {
    setCurrentStage((prevStage) => prevStage + 1);
  };

  return (
    <div className="flex justify-center">
      <h2>Pokémon Names:</h2>
      <ul>
        {pokemonInstancesForCurrentEncounter.map((pokemonInstance, index) => (
          <ShowPokemonBattle
            key={`${pokemonInstance.id}-${index}`}
            pokemonInstance={pokemonInstance}
          />
        ))}
      </ul>

      <button onClick={handleNextStage}>Next Stage</button>
    </div>
  );
};

export default Encounter;
