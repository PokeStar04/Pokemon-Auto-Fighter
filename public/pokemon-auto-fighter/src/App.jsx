import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen/HomeScreen';
import HomeHUD from './components/HomeHUD/HomeHUD.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/jouer" element={<HomeHUD />} />
      </Routes>
    </Router>
  );
};

export default App;
