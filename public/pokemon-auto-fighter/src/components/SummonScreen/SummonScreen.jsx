import React, { useState, useEffect } from 'react';

const SummonScreen = () => {
  const [pokemonId, setPokemonId] = useState(null);
  const [pokemonStats, setPokemonStats] = useState(null);
  const [userGold, setUserGold] = useState(0);

  useEffect(() => {
    // Charger la quantité d'or de l'utilisateur au chargement de la page
    const fetchUserGold = async () => {
      try {
        const goldResponse = await fetch('http://localhost:3001/user/gold/1');
        if (goldResponse.ok) {
          const goldData = await goldResponse.json();
          setUserGold(goldData[0].gold);
        } else {
          console.error(
            "Erreur lors de la récupération de la quantité d'or de l'utilisateur",
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la quantité d'or de l'utilisateur",
          error.message,
        );
      }
    };

    fetchUserGold();
  }, []);

  const handleSummonClick = async (minRarity, maxRarity) => {
    // try {
    // const getPokemon = await fetch(
    //   `http://localhost:3001/pokemon`,
    // );
    // if (response.ok) {
    //   const result = await response.json();
    //   setPokemonStats(result);
    // }
    console.log(minRarity);
    console.log(maxRarity);
    const response = await fetch(
      `http://localhost:3001/pokemon/rarity/${minRarity}/${maxRarity}`,
    );
    if (response.ok) {
      const result = await response.json();
      console.log(JSON.stringify(result, null, 2)); // Affiche le résultat de manière lisible
      const randomIndex = Math.floor(Math.random() * result.length);
      const randomPokemon = result[randomIndex];

      console.log('Pokémon aléatoire:', randomPokemon.id);
      setPokemonId(randomPokemon.id);
    } else {
      console.error('Erreur lors de la requête fetch:', response.status);
    }
    // Supposez que 'result' soit votre tableau de résultats

    if (pokemonId && userGold >= 100) {
      try {
        // Vérifier la quantité d'or de l'utilisateur
        const response = await fetch(
          `http://localhost:3001/pokemon/${pokemonId}`,
        );
        if (response.ok) {
          const result = await response.json();
          setPokemonStats(result);

          // Ensuite, effectuez une autre requête pour insérer les statistiques dans la base de données
          const summonResponse = await fetch('http://localhost:3001/summon', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idUser: 1, // Vous pouvez remplacer 1 par la valeur souhaitée
              pokemonStats: result,
            }),
          });

          if (summonResponse.ok) {
            // Déduire 100 d'or de la quantité actuelle de l'utilisateur
            const updatedGold = userGold - 100;
            setUserGold(updatedGold);

            console.log(
              'Statistiques du Pokémon insérées avec succès dans la base de données.',
            );
          } else {
            console.error(
              "Erreur lors de l'insertion des statistiques du Pokémon dans la base de données.",
            );
          }
        } else {
          console.error(
            'Erreur lors de la récupération des statistiques du Pokémon',
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération ou de l'insertion des statistiques du Pokémon",
          error.message,
        );
      }
    } else {
      console.log(
        "L'utilisateur n'a pas suffisamment d'or pour invoquer le Pokémon.",
      );
    }
  };

  return (
    <div>
      <div className="mx-8 flex justify-between">
        <input
          type="text"
          placeholder="ID du Pokémon"
          value={pokemonId || ''}
          onChange={(e) => setPokemonId(e.target.value)}
        />
        <button onClick={() => handleSummonClick(300, 400)}>
          Invoquer Pokémon (Rareté 300-400)
        </button>
        <button onClick={() => handleSummonClick(400, 500)}>
          Invoquer Pokémon (Rareté 400-500)
        </button>
        <button onClick={() => handleSummonClick(500, 560)}>
          Invoquer Pokémon (Rareté 500-600)
        </button>
        <button onClick={() => handleSummonClick(560, 700)}>
          Invoquer Pokémon (Rareté 560-700)
        </button>
      </div>

      {pokemonStats && (
        <div>
          <h2>Statistiques du Pokémon invoqué :</h2>
          <img src={pokemonStats[0].frontSprite} alt="Pokemon Sprite" />
          <pre>{JSON.stringify(pokemonStats, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SummonScreen;
