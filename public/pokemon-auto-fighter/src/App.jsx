import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen/HomeScreen';
import HomeHUD from './components/HomeHUD/HomeHUD.jsx';
import DungeonsChoice from './components/DungeonsChoice/DungeonsChoice.jsx';
import GameContainer from './components/GameContainer/GameContainer.jsx';
import StageScreen from './components/StageScreen/StageScreen.jsx';
//import { StageProvider } from './components/StagesChoice/StageContext';
import { GlobalStateProvider } from './GlobalState';
const App = () => {
  return (
    <Router>
      <GlobalStateProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/jouer" element={<HomeHUD />} />
          <Route path="/dungeon" element={<GameContainer />} />
          <Route path="/encounter" element={<StageScreen />} />
        </Routes>
      </GlobalStateProvider>
    </Router>
  );
};

export default App;
