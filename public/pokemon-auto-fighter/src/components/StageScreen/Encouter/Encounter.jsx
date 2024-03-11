import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from '../../../models/pokemonModel';
import ShowPokemonBattle from './ShowPokemonBattle/ShowPokemonBattle';

const Encounter = ({ encountersData, userPokemonTeam }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [
    pokemonInstancesForCurrentEncounter,
    setPokemonInstancesForCurrentEncounter,
  ] = useState([]);
  const [pokemonUserTeam, setPokemonUserTeam] = useState([]);
  const [pokemonInstancesForUserTeam, setPokemonInstancesForTeam] = useState(
    [],
  );

  // const handleAttack = (instanceData) => {
  //   const pokemonInstanceSlot = instanceData[0];
  //   const pokemonInstanceIsAlly = instanceData[1];

  //   console.log(pokemonInstanceIsAlly);
  //   const alivePokemonSlots = pokemonInstancesForCurrentEncounter
  //     .filter((pokemonInstance) => !pokemonInstance.isDead)
  //     .map((pokemonInstance) => pokemonInstanceSlot);
  //   console.log(`Slots des Pokémon en vie: ${alivePokemonSlots}`);
  //   // Générez un nombre aléatoire pour choisir un slot parmi les Pokémon en vie
  //   const randomPokemonSlot =
  //     alivePokemonSlots[Math.floor(Math.random() * alivePokemonSlots.length)];
  //   console.log(`Slot du Pokémon choisi aléatoirement: ${randomPokemonSlot}`);
  //   // Appliquez les dégâts au Pokémon choisi aléatoirement
  //   // const pokemonHp = pokemonInstancesForCurrentEncounter[randomPokemonSlot].hp;
  //   // const pokemonHpp = pokemonInstancesForCurrentEncounter[randomPokemonSlot];
  //   // console.log('HP : ' + pokemonHp);
  //   // const pokemonHp = pokemonInstancesForCurrentEncounter[randomPokemonSlot].hp;

  //   // applyDamage(randomPokemonSlot, 20); // 20 est la quantité de dégâts, ajustez selon vos besoins
  // };

  const decreaseEnemyPokemonHp = (pokemonSlot, damageAmount) => {
    setPokemonInstancesForCurrentEncounter((prevPokemonInstances) => {
      const updatedPokemonInstances = [...prevPokemonInstances];
      const pokemonIndex = updatedPokemonInstances.findIndex(
        (pokemonInstance) => pokemonInstance.slot === pokemonSlot,
      );

      if (pokemonIndex !== -1) {
        const currentHP = updatedPokemonInstances[pokemonIndex].hp;
        const newHP = Math.max(currentHP - damageAmount, 0);
        updatedPokemonInstances[pokemonIndex] = {
          ...updatedPokemonInstances[pokemonIndex],
          hp: newHP,
        };
      }

      return updatedPokemonInstances;
    });
  };

  const handleAttack = (instanceData) => {
    const pokemonInstanceSlot = instanceData[0];
    const pokemonInstanceIsAlly = instanceData[1];

    console.log(`Attack! Pokemon Slot: ${pokemonInstanceSlot}`);

    // Check if the instance is an ally or enemy to target
    if (pokemonInstanceIsAlly) {
      // Get slots of enemy Pokémon that are alive
      const alivePokemonSlots = pokemonInstancesForCurrentEncounter
        .filter((pokemonInstance) => !pokemonInstance.isDead)
        .map((pokemonInstance) => pokemonInstance.slot);

      if (alivePokemonSlots.length > 0) {
        // Choose a random slot among the alive enemy Pokémon
        const randomPokemonSlot =
          alivePokemonSlots[
            Math.floor(Math.random() * alivePokemonSlots.length)
          ];
        decreaseEnemyPokemonHp(randomPokemonSlot, 10); // Adjust the amount as needed
      } else {
        console.log('No alive enemy Pokémon to attack!');
        // Handle the case where there are no alive enemy Pokémon
      }
    }

    // Add the rest of your logic...

    // Générez un nombre aléatoire pour choisir un slot parmi les Pokémon en vie
    // const randomPokemonSlot =
    //   alivePokemonSlots[Math.floor(Math.random() * alivePokemonSlots.length)];
    // console.log(`Slot du Pokémon choisi aléatoirement: ${randomPokemonSlot}`);
    // // Appliquez les dégâts au Pokémon choisi aléatoirement
    // const pokemonHp = pokemonInstancesForCurrentEncounter[randomPokemonSlot].hp;
    // const pokemonHpp = pokemonInstancesForCurrentEncounter[randomPokemonSlot];
    // console.log('HP : ' + pokemonHp);
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
  const fetchUserTeamPokemonData = async () => {
    try {
      // Requête pour récupérer les données de l'équipe du joueur
      const response = await axios.get(`http://localhost:3001/pokemonTeam/0/1`);
      const userTeamPokemonData = response.data;

      // Mise à jour du state pokemonUserTeam
      setPokemonUserTeam([userTeamPokemonData]);

      // Affiche les données récupérées dans la console
      console.log('User Team Pokemon Data:', userTeamPokemonData);
    } catch (error) {
      console.error('Error while fetching Pokemon User Team data: ', error);
    }
  };

  useEffect(() => {
    // Appeler la fonction fetchUserTeamPokemonData lors du chargement initial
    fetchUserTeamPokemonData();
  }, []);

  // Déplacez le console.log ici pour vous assurer que les données sont correctement mises à jour
  console.log('User Team Pokemon Data:', pokemonUserTeam);
  useEffect(() => {
    setPokemonInstancesForTeam(
      pokemonUserTeam[0]?.map(
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
    let userTeamPokemons = [];
    pokemonUserTeam[0]?.forEach((currentPokemon, index) => {
      currentPokemon.isDead = false;
      currentPokemon.slot = index;
      currentPokemon.isAlly = true;
      userTeamPokemons.push(currentPokemon);
    });
    setPokemonInstancesForTeam(userTeamPokemons);
  }, [pokemonUserTeam]); // Ajoutez pokemonUserTeam comme dépendance
  console.log(pokemonInstancesForUserTeam);

  const handleNextStage = () => {
    setCurrentStage((prevStage) => prevStage + 1);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {/* Pokémon de l'utilisateur à gauche */}
        <div className="col-span-1">
          <ul className="flex flex-col items-end">
            {pokemonInstancesForUserTeam.map((pokemonInstance, index) => (
              <li key={`${pokemonInstance.id}-${index}`} className="mb-4">
                <ShowPokemonBattle
                  pokemonInstance={pokemonInstance}
                  handleAttack={(pokemonInstanceSlot) =>
                    handleAttack(pokemonInstanceSlot)
                  }
                  hp={pokemonInstance.hp}
                  //decreaseEnemyPokemonHp={decreaseEnemyPokemonHp}
                  decreaseEnemyPokemonHp={(pokemonSlot, damageAmount) => {
                    // Implement your logic to decrease enemy Pokémon's HP here
                    console.log(
                      `Decrease HP of enemy Pokémon in slot ${pokemonSlot} by ${damageAmount}`,
                    );
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne vide au centre */}
        <div className="col-span-1"></div>

        {/* Pokémon ennemis à droite */}
        <div className="col-span-1">
          <ul className="flex flex-col items-start">
            {pokemonInstancesForCurrentEncounter.map(
              (pokemonInstance, index) => (
                <li key={`${pokemonInstance.id}-${index}`} className="mb-4">
                  <ShowPokemonBattle
                    pokemonInstance={pokemonInstance}
                    handleAttack={(pokemonInstanceSlot) =>
                      handleAttack(pokemonInstanceSlot)
                    }
                    decreaseEnemyPokemonHp={decreaseEnemyPokemonHp}
                  />
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Bouton en bas */}
        <div className="col-span-3 flex justify-center mt-8">
          <button
            onClick={handleNextStage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Next Stage
          </button>
        </div>
      </div>
    </>
  );
};

export default Encounter;
