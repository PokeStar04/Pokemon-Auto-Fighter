import React from 'react';
import { Link } from 'react-router-dom';

const ButtonChoiceMainActivity = ({ btnName, destination }) => {
  return (
    <Link to={destination}>
      <button className="bg-red-500 p-12">{btnName}</button>
    </Link>
  );
};

export default ButtonChoiceMainActivity;
