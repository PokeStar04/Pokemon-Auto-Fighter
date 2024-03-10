import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen/HomeScreen';
import HomeHUD from './components/HomeHUD/HomeHUD.jsx';
import GameContainer from './components/GameContainer/GameContainer.jsx';
import StageScreen from './components/StageScreen/StageScreen.jsx';
import SummonScreen from './components/SummonScreen/SummonScreen.jsx';
import { GlobalStateProvider } from './GlobalState';
const App = () => {
  return (
    <Router>
      <GlobalStateProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/jouer" element={<HomeHUD />} />
          <Route path="/summon" element={<SummonScreen />} />
          <Route path="/dungeon" element={<GameContainer />} />
          <Route path="/encounter" element={<StageScreen />} />
        </Routes>
      </GlobalStateProvider>
    </Router>
  );
};

export default App;
