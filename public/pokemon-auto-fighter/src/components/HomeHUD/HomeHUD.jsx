import React from 'react';
import ButtonChoiceMainActivity from '../ui/navigation/ButtonChoiceMainActivity/ButtonChoiceMainActivity';

const HomeHUD = () => {
  return (
    <div>
      <div className="mx-8 flex justify-between ">
        <ButtonChoiceMainActivity btnName="Summon" destination="/summon" />
        <ButtonChoiceMainActivity btnName="Dungeon" destination="/dungeon" />
        <ButtonChoiceMainActivity btnName="Team" destination="/team" />
      </div>
    </div>
  );
};

export default HomeHUD;
