import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from '../../../models/pokemonModel';
import ShowPokemonBattle from './ShowPokemonBattle/ShowPokemonBattle';

const Encounter = ({ encountersData, userPokemonTeam }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [userTeamData, setUserTeamData] = useState([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [
    pokemonInstancesForCurrentEncounter,
    setPokemonInstancesForCurrentEncounter,
  ] = useState([]);
  const [pokemonUserTeam, setPokemonUserTeam] = useState([]);

  const handleAttack = (pokemonInstanceSlot) => {
    console.log(`Attack! Pokemon ID: ${pokemonData[0]}`);
    console.log(`Attack! Pokemon ID: ${pokemonData[1]}`);
    console.log(`Attack! Pokemon ID: ${pokemonData[2]}`);
    console.log(`Attack! Pokemon ID: ${pokemonData[3]}`);
    console.log(`Attack! Pokemon ID: ${pokemonData[4]}`);

    console.log(`Attack! Pokemon ID: ${pokemonInstanceSlot}`);
    // Utilisez map pour obtenir les slots des Pokémon en vie
    const alivePokemonSlots = pokemonInstancesForCurrentEncounter
      .filter((pokemonInstance) => !pokemonInstance.isDead)
      .map((pokemonInstance) => pokemonInstance.slot);
    console.log(`Slots des Pokémon en vie: ${alivePokemonSlots}`);
    // Générez un nombre aléatoire pour choisir un slot parmi les Pokémon en vie
    const randomPokemonSlot =
      alivePokemonSlots[Math.floor(Math.random() * alivePokemonSlots.length)];
    console.log(`Slot du Pokémon choisi aléatoirement: ${randomPokemonSlot}`);
    // Appliquez les dégâts au Pokémon choisi aléatoirement
    const pokemonHp = pokemonInstancesForCurrentEncounter[randomPokemonSlot].hp;
    const pokemonHpp = pokemonInstancesForCurrentEncounter[randomPokemonSlot];
    console.log('HP : ' + pokemonHp);
    // const pokemonHp = pokemonInstancesForCurrentEncounter[randomPokemonSlot].hp;

    // applyDamage(randomPokemonSlot, 20); // 20 est la quantité de dégâts, ajustez selon vos besoins
  };

  // const applyDamage = (pokemonSlot, damageAmount) => {
  //   setPokemonInstancesForCurrentEncounter((prevPokemonInstances) => {
  //     const updatedPokemonInstances = [...prevPokemonInstances];
  //     const pokemonIndex = updatedPokemonInstances.findIndex(
  //       (pokemonInstance) => pokemonInstance.slot === pokemonSlot,
  //     );

  //     // if (pokemonIndex !== -1) {
  //     //   const currentHP = updatedPokemonInstances[pokemonIndex].hp;
  //     //   const newHP = Math.max(currentHP - damageAmount, 0);
  //     //   updatedPokemonInstances[pokemonIndex] = {
  //     //     ...updatedPokemonInstances[pokemonIndex],
  //     //     hp: newHP,
  //     //   };
  //     // }

  //     return updatedPokemonInstances;
  //   });
  // };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonRequests = encountersData.map((encounter) =>
          axios.get(`http://localhost:3001/pokemonEncounters/${encounter.id}`),
        );

        const responses = await Promise.all(pokemonRequests);

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
    setPokemonInstancesForCurrentEncounter(
      pokemonData[currentStage]?.map(
        (data) =>
          new Pokemon(
            data.id,
            data.name,
            data.type1,
            data.type2,
            data.hp,
            data.maxHp,
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
    let encounterPokemons = [];
    pokemonData[currentStage]?.forEach((currentPokemon, index) => {
      currentPokemon.isDead = false;
      currentPokemon.slot = index;
      currentPokemon.isAlly = false;
      encounterPokemons.push(currentPokemon);
    });

    setPokemonInstancesForCurrentEncounter(encounterPokemons);
  }, [pokemonData, currentStage]);

  //Get UserPokemonTeam
  // useEffect(() => {
  //   const fetchUserTeamPokemonData = async () => {
  //     try {
  //       const pokemonUserTeamRequests = userPokemonTeam.map((userPokemon) =>
  //         axios.get(
  //           `http://localhost:3001/pokemonEncounters/${userPokemon.id}`,
  //         ),
  //       );

  //       const responses = await Promise.all(pokemonUserTeamRequests);
  //       const pokemonUserTeamData = responses.map((response) => response.data);

  //       setUserTeamData(pokemonUserTeamData);
  //     } catch (error) {
  //       console.error('Error while fetching Pokemon User Team data: ', error);
  //     }
  //   };
  //   fetchUserTeamPokemonData();
  // }, [userPokemonTeam]);
  // useEffect(() => {
  //   setPokemonUserTeam(
  //     userTeamData[currentStage]?.map(
  //       (data) =>
  //         new Pokemon(
  //           data.id,
  //           data.name,
  //           data.type1,
  //           data.type2,
  //           data.hp,
  //           data.maxHp,
  //           data.attack,
  //           data.defence,
  //           data.specialAttack,
  //           data.specialDefence,
  //           data.speed,
  //           data.experience,
  //           data.rarity,
  //           data.frontSprite,
  //           data.backSprite,
  //         ),
  //     ) || [],
  //   );

  //   userTeamData[currentStage]?.forEach((currentPokemon, index) => {
  //     currentPokemon.isDead = false;
  //     currentPokemon.slot = index;
  //     currentPokemon.isAlly = false;
  //   });
  //   console.log(userTeamData[currentStage]);
  // }, [pokemonData, currentStage]);

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
            handleAttack={(pokemonInstanceSlot) =>
              handleAttack(pokemonInstanceSlot)
            }
            // applyDamage={(pokemonSlot, damageAmount) =>
            //   applyDamage(pokemonSlot, damageAmount)
            // }
          />
        ))}
      </ul>

      <button onClick={handleNextStage}>Next Stage</button>
    </div>
  );
};

export default Encounter;
