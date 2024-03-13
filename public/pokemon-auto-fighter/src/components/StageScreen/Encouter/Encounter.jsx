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
  const [pokemonInstancesForUserTeam, setPokemonInstancesForUserTeam] =
    useState([]);

  function calculateMaxHp(baseHp) {
    return Math.round(((31 + 2 * baseHp + 255 / 4) * 50) / 100 + 10 + 10);
  }
  function calculateSimpleDamage(Niveau, Attaque, CC, Defense, Modificateur) {
    const degatsInfliges = Math.round(
      ((Niveau * Attaque * (1 + CC)) / (2 * Defense)) * Modificateur,
    );
    return degatsInfliges;
  }

  // const chooseRandomTarget = (
  //   pokemonInstances,
  //   pokemonInstancesForUserTeam,
  // ) => {
  //   console.log(pokemonInstancesForUserTeam);
  //   const alivePokemonSlots = pokemonInstances
  //     .filter((pokemonInstance) => !pokemonInstance.isDead)
  //     .map((pokemonInstance) => pokemonInstance.slot);

  //   console.log({
  //     alivePokemonSlots: alivePokemonSlots,
  //     pokemonInstancesForUserTeam: pokemonInstancesForUserTeam,
  //   });

  //   if (alivePokemonSlots.length > 0) {
  //     // Choisissez un slot de manière aléatoire parmi les Pokémon en vie
  //     const randomPokemonSlot =
  //       alivePokemonSlots[Math.floor(Math.random() * alivePokemonSlots.length)];

  //     return {
  //       target: randomPokemonSlot, // Utilisez directement le slot aléatoire
  //       isTargetAlive: true,
  //     };
  //   } else {
  //     return {
  //       target: null,
  //       isTargetAlive: false,
  //     };
  //   }
  // };

  const updateHpForEnemyInstance = (enemyTarget, updatedHp) => {
    setPokemonInstancesForCurrentEncounter((prevState) => {
      const updatedInstances = prevState.map((pokemonInstance) =>
        pokemonInstance.slot === enemyTarget
          ? { ...pokemonInstance, hp: updatedHp }
          : pokemonInstance,
      );
      //console.log('After Update:', JSON.stringify(updatedInstances));

      return updatedInstances;
    });
  };

  const updateHpForUserInstance = (enemyTarget, updatedHp) => {
    setPokemonInstancesForUserTeam((prevState) => {
      const updatedInstances = prevState.map((pokemonInstance) =>
        pokemonInstance.slot === enemyTarget
          ? { ...pokemonInstance, hp: updatedHp }
          : pokemonInstance,
      );
      // console.log('After Update:', JSON.stringify(updatedInstances));

      return updatedInstances;
    });
  };

  const chooseRandomTarget = (pokemonInstances) => {
    //console.log({ pokemonInstances: pokemonInstances });
    const alivePokemonSlots = pokemonInstances
      .filter((pokemonInstance) => !pokemonInstance.isDead)
      .map((pokemonInstance) => pokemonInstance.slot);

    if (alivePokemonSlots.length > 0) {
      // Choisissez un slot de manière aléatoire parmi les Pokémon en vie
      const randomPokemonSlot =
        alivePokemonSlots[Math.floor(Math.random() * alivePokemonSlots.length)];

      return {
        target: randomPokemonSlot, // Utilisez directement le slot aléatoire
        isTargetAlive: true,
      };
    } else {
      return {
        target: null,
        isTargetAlive: false,
      };
    }
  };
  const handleAttack = (instanceData) => {
    console.log({ pokemonInstancesForUserTeam });
    //console.log({ instanceData: instanceData });
    const pokemonInstanceSlot = instanceData[0];
    const pokemonInstanceIsAlly = instanceData[1];
    //console.log(pokemonInstancesForUserTeam);
    // pokemonInstancesForUserTeam.forEach((pokemonUserInstance, index) => {
    //   console.log(`Pokemon ${index + 1} (Ally):`, pokemonUserInstance);
    // });
    // console.log('slot', pokemonInstanceSlot, 'Ally :', pokemonInstanceIsAlly);

    // if (pokemonInstanceIsAlly) {
    //   console.log('je suis un allié qui attaque');

    //   pokemonInstancesForCurrentEncounter.forEach((pokemonInstance, index) => {
    //     console.log(`Pokemon ${index + 1} (Ennemi):`, pokemonInstance);
    //   });
    // }

    // if (pokemonInstanceIsAlly == false) {
    //   console.log('je suis un ennemi qui attaque');

    //   pokemonInstancesForUserTeam.forEach((pokemonUserInstance, index) => {
    //     console.log(`Pokemon ${index + 1} (Enemie):`, pokemonUserInstance);
    //   });
    // }

    const pokemonInstanceAttack = instanceData[2];
    const pokemonInstanceHp = instanceData[3];

    // const targetInfo = chooseRandomTarget(
    //   pokemonInstanceIsAlly
    //     ? pokemonInstancesForCurrentEncounter // Allié
    //     : pokemonInstancesForUserTeam, // Ennemi
    // );

    const targetInfo = chooseRandomTarget(
      pokemonInstanceIsAlly
        ? pokemonInstancesForCurrentEncounter // Allié
        : pokemonInstancesForUserTeam, // Ennemi
    );
    //const targetInfo = chooseRandomTarget(pokemonInstancesForUserTeam);

    const targetTableau = pokemonInstanceIsAlly
      ? pokemonInstancesForCurrentEncounter
      : pokemonInstancesForUserTeam;

    // console.log({
    //   targetTableau: targetTableau,
    //   pokemonInstanceIsAlly: pokemonInstanceIsAlly,
    //   pokemonInstancesForUserTeam: pokemonInstancesForUserTeam,
    // });
    if (targetInfo.isTargetAlive) {
      // console.log({ target: targetInfo.isTargetAlive });
      const enemyTarget = targetInfo.target;
      const enemyTargetData = pokemonInstanceIsAlly
        ? pokemonInstancesForCurrentEncounter[enemyTarget] // Allié
        : pokemonInstancesForUserTeam[enemyTarget]; // Ennemi

      // console.log({ enemyTargetData: enemyTargetData });
      const resultatSimple = calculateSimpleDamage(
        50,
        pokemonInstanceAttack,
        0,
        enemyTargetData.defence,
        1,
      );
      const updatedHp =
        pokemonInstancesForCurrentEncounter[enemyTarget].hp - resultatSimple;
      // Mettez à jour l'état local
      // console.log(pokemonInstanceIsAlly);
      if (pokemonInstanceIsAlly) {
        pokemonInstancesForCurrentEncounter[enemyTarget].hp = updatedHp;
        if (pokemonInstancesForCurrentEncounter[enemyTarget].hp <= 0) {
          pokemonInstancesForCurrentEncounter[enemyTarget].isDead = true;
        }
      } else {
        console.log('Je sui un enemy je dois attaquer des grand mort');

        // updateUserPokemonHp(2, updatedHp);
      }
    } else {
      // console.log({ target: targetInfo.isTargetAlive });
      // console.log({ pokemonInstancesForUserTeam: pokemonInstancesForUserTeam });

      console.log('No alive enemy Pokémon to attack!');
      // Gérer le cas où il n'y a pas de Pokémon ennemi en vie
    }
  };
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
      currentPokemon.maxHp = calculateMaxHp(currentPokemon.maxHp);
      currentPokemon.hp = calculateMaxHp(currentPokemon.hp);
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
      //  console.log('User Team Pokemon Data:', userTeamPokemonData);
    } catch (error) {
      console.error('Error while fetching Pokemon User Team data: ', error);
    }
  };
  useEffect(() => {
    fetchUserTeamPokemonData();
  }, []);

  useEffect(() => {
    setPokemonInstancesForUserTeam(
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
      currentPokemon.maxHp = calculateMaxHp(currentPokemon.maxHp);
      currentPokemon.hp = calculateMaxHp(currentPokemon.hp);
      userTeamPokemons.push(currentPokemon);
    });
    setPokemonInstancesForUserTeam(userTeamPokemons);
  }, [pokemonUserTeam]);

  // useEffect(() => {
  //   let userTeamPokemons = [];

  //   pokemonUserTeam[0]?.forEach((data, index) => {
  //     const currentPokemon = new Pokemon(
  //       data.id,
  //       data.name,
  //       data.type1,
  //       data.type2,
  //       data.hp,
  //       data.maxHp,
  //       data.attack,
  //       data.defence,
  //       data.specialAttack,
  //       data.specialDefence,
  //       data.speed,
  //       data.experience,
  //       data.rarity,
  //       data.frontSprite,
  //       data.backSprite,
  //     );

  //     currentPokemon.isDead = false;
  //     currentPokemon.slot = index;
  //     currentPokemon.isAlly = true;
  //     currentPokemon.maxHp = calculateMaxHp(currentPokemon.maxHp);
  //     currentPokemon.hp = calculateMaxHp(currentPokemon.hp);

  //     userTeamPokemons.push(currentPokemon);
  //   });

  //   setPokemonInstancesForUserTeam(userTeamPokemons);
  // }, [pokemonUserTeam]);

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
                  updateHp={(updatedHp) =>
                    updateHpForEnemyInstance(pokemonInstance.slot, updatedHp)
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1"></div>
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
                    hp={pokemonInstance.hp}
                    updateHp={(updatedHp) =>
                      updateHpForUserInstance(pokemonInstance.slot, updatedHp)
                    }
                  />
                </li>
              ),
            )}
          </ul>
        </div>
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
