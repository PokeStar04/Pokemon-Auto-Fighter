import React, { createContext, useContext, useState } from 'react';

// Créez le contexte
const GlobalStateContext = createContext();

// Créez le fournisseur de contexte
export const GlobalStateProvider = ({ children }) => {
  // Définissez l'état global ici
  const [stageId, setStageId] = useState(null);

  // Ajoutez une fonction pour mettre à jour l'état global
  const setGlobalStageId = (newStageId) => {
    setStageId(newStageId);
  };

  // Fournissez le contexte et les fonctions associées aux composants enfants
  return (
    <GlobalStateContext.Provider value={{ stageId, setGlobalStageId }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Créez un hook pour utiliser le contexte dans les composants
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
