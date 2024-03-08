import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../GlobalState'; // Assurez-vous de spécifier le bon chemin

const StageChoice = ({ dungeonId }) => {
  const { setGlobalStageId } = useGlobalState();

  const [loading, setLoading] = useState(true);
  const [stages, setStages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/stages/${dungeonId}`)
      .then((response) => {
        setStages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error while fetching stages: ', error);
        setLoading(false);
      });
  }, [dungeonId]);

  const handleStageClick = (stageId) => {
    setGlobalStageId(stageId);
  };
  return (
    <div className="flex flex-wrap">
      {loading ? (
        <div>Chargement en cours...</div>
      ) : Array.isArray(stages) && stages.length > 0 ? (
        stages.map((stage) => (
          <Link
            key={stage.id}
            to={`/encounter`}
            className="p-12 bg-green-500 w-1/3 m-2 text-white"
            onClick={() => handleStageClick(stage.id)}
          >
            {`Level: ${stage.levelStage}, Reward: ${stage.reward}`}
          </Link>
        ))
      ) : (
        <div>Aucun stage trouvé.</div>
      )}
    </div>
  );
};

export default StageChoice;
