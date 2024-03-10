// DungeonsChoice.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DungeonsChoice = ({ changeScreen }) => {
  const [loading, setLoading] = useState(true);
  const [dungeons, setDungeons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dungeons');
        setDungeons(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error while fetching dungeons: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDungeonClick = (id) => {
    setLoading(true);
    console.log(`Dungeon clicked: ${id}`);

    setTimeout(() => {
      changeScreen('StageChoice', id);
    }, 1000);
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
