// DungeonsChoice.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DungeonsChoice = ({ changeScreen }) => {
  const [loading, setLoading] = useState(true);
  const [dungeons, setDungeons] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/dungeons')
      .then((response) => {
        setDungeons(response.data.data);
        setLoading(false); // Marque le chargement comme terminé une fois les données reçues
      })
      .catch((error) => {
        console.error('Error while fetching dungeons: ', error);
        setLoading(false); // Marque le chargement comme terminé en cas d'erreur
      });
  }, []);

  const handleDungeonClick = (id) => {
    setLoading(true); // Affiche l'écran de chargement au moment du clic
    console.log(`Dungeon clicked: ${id}`);

    // Simulez une tâche asynchrone avant de naviguer vers la nouvelle route
    setTimeout(() => {
      // Utilisez history.push une fois que la tâche asynchrone est terminée
      changeScreen('StageChoice', id);
    }, 1000); // Exemple de délai de 1 seconde (remplacez cela par votre logique de chargement réelle)
  };

  return (
    <div className="flex flex-wrap">
      {loading ? (
        <div>Chargement en cours...</div>
      ) : Array.isArray(dungeons) && dungeons.length > 0 ? (
        dungeons.map((dungeon) => (
          <button
            key={dungeon.id}
            className="p-12 bg-blue-500 w-1/3 m-2 text-white"
            onClick={() => handleDungeonClick(dungeon.id)}
          >
            {dungeon.name}
          </button>
        ))
      ) : (
        <div>Aucun donjon trouvé.</div>
      )}
    </div>
  );
};

export default DungeonsChoice;
