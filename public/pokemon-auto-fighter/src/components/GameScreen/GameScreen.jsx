// import React, { useState } from 'react';
// import DungeonsChoice from '../DungeonsChoice/DungeonsChoice';
// import StageChoice from '../StagesChoice/StageChoice';

// const GameScreen = () => {
//   const [selectedScreen, setSelectedScreen] = useState(null);

//   // Fonction pour changer l'écran en fonction de l'interaction utilisateur
//   const changeScreen = (screen) => {
//     setSelectedScreen(screen);
//   };

//   return (
//     <div>
//       {/* Vous pouvez ajouter ici des éléments communs à tous les écrans de jeu */}
//       <h1>Titre de l'écran de jeu</h1>

//       {/* Affiche le contenu en fonction de l'écran sélectionné */}
//       {selectedScreen === 'DungeonsChoice' && (
//         <DungeonsChoice changeScreen={changeScreen} />
//       )}

//       {selectedScreen === 'StageChoice' && (
//         <StageChoice changeScreen={changeScreen} />
//       )}
//     </div>
//   );
// };

// export default GameScreen;
