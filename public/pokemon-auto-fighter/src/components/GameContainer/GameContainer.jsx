// GameContainer.jsx
import React, { useState } from 'react';
import DungeonsChoice from '../DungeonsChoice/DungeonsChoice';
import StageChoice from '../StagesChoice/StageChoice';
import StageScreen from '../StageScreen/StageScreen';

const GameContainer = () => {
  const [currentScreen, setCurrentScreen] = useState('DungeonsChoice');
  const [selectedDungeonId, setSelectedDungeonId] = useState(null);

  const changeScreen = (screen, dungeonId = null, stageId = null) => {
    setCurrentScreen(screen);
    if (dungeonId !== null) {
      setSelectedDungeonId(dungeonId);
    }

    console.log('Current Screen:', currentScreen);
    console.log('Selected Dungeon ID:', selectedDungeonId);
  };

  return (
    <div>
      {currentScreen === 'DungeonsChoice' && (
        <DungeonsChoice changeScreen={changeScreen} />
      )}
      {currentScreen === 'StageChoice' && (
        <StageChoice
          dungeonId={selectedDungeonId}
          changeScreen={changeScreen}
        />
      )}
    </div>
  );
};

export default GameContainer;
