import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div>
      <div className="bg-blue-500 text-red p-4 m-8">
        <h1 className="text-4xl font-bold">
          Bienvenue sur votre écran d'accueil
        </h1>
      </div>
      <Link to="/jouer">
        <button>Jouer</button>
      </Link>
      <Link to="/charger">
        <button>Charger une partie</button>
      </Link>
    </div>
  );
};

export default HomeScreen;
