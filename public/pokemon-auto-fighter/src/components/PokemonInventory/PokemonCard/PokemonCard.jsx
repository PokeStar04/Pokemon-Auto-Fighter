// PokemonCard.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const PokemonCard = ({ pokemon, index, moveCard, onSelect, isSelected }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'PokemonCard',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'PokemonCard',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drop(drag(node))}
      className={`border p-4 ${isDragging ? 'opacity-50' : ''} ${
        isSelected ? 'border-blue-500' : ''
      }`}
      onClick={() => onSelect(index)}
    >
      <img
        src={pokemon.frontSprite}
        alt={pokemon.name}
        className="mx-auto mb-2"
      />
      <p className="text-center">{pokemon.name}</p>
      <p className="text-center">Type: {pokemon.type1}</p>
      {/* Ajoutez d'autres informations selon vos besoins */}
    </div>
  );
};

export default PokemonCard;
