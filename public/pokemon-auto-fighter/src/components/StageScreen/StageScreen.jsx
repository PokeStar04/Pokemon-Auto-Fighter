import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalState } from '../../GlobalState';
import Encounter from './Encouter/Encounter';
const StageScreen = () => {
  const { stageId } = useGlobalState();

  const [loading, setLoading] = useState(true);
  const [encounters, setEncounters] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/encounters/${stageId}`)
      .then((response) => {
        setEncounters(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error while fetching encounters: ', error);
        setLoading(false);
      });
  }, [stageId]);
  console.log(encounters);
  return (
    <div>
      <h2>Encounters for Stage {stageId}</h2>
      {loading ? (
        <div>Loading encounters...</div>
      ) : Array.isArray(encounters) && encounters.length > 0 ? (
        <Encounter encountersData={encounters} />
      ) : (
        <div>No encounters found for this stage.</div>
      )}
    </div>
  );
};

export default StageScreen;
