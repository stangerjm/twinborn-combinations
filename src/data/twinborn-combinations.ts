const UnknownEffect = 'Unknown';

export enum Metal {
  Steel = 'Steel',
  Iron = 'Iron',
  Pewter = 'Pewter',
  Tin = 'Tin',
  Zinc = 'Zinc',
  Brass = 'Brass',
  Copper = 'Copper',
  Bronze = 'Bronze',
  Duralumin = 'Duralumin',
  Aluminum = 'Aluminum',
  Nicrosil = 'Nicrosil',
  Chromium = 'Chromium',
  Gold = 'Gold',
  Electrum = 'Electrum',
  Cadmium = 'Cadmium',
  Bendalloy = 'Bendalloy',
  Malatium = 'Malatium',
  Atium = 'Atium',
}

type FeruchemicalPower = {
  tappingEffect: string;
  storingEffect: string;
  names: string[];
};

type AllomanticPower = {
  names: string[];
  burningEffect: string;
};

export type Twinborn = {
  allomanticPower: AllomanticPower & { metal: Metal };
  feruchemicalPower: FeruchemicalPower & { metal: Metal };
};

const allomanticPowers: { [key in Metal]: AllomanticPower } = {
  Steel: {
    names: ['Coinshot'],
    burningEffect: 'Allows user to push on metal.',
  },
  Iron: {
    names: ['Lurcher'],
    burningEffect: 'Allows user to pull on metal.',
  },
  Pewter: {
    names: ['Thug', 'Pewterarm'],
    burningEffect: "Enhances user's physical abilities.",
  },
  Tin: {
    names: ['Tineye'],
    burningEffect: "Enhances user's senses.",
  },
  Zinc: {
    names: ['Rioter'],
    burningEffect: "Allows user to riot other people's emotions.",
  },
  Brass: {
    names: ['Soother'],
    burningEffect: "Allows user to soothe other people's emotions.",
  },
  Copper: {
    names: ['Smoker', 'Coppercloud'],
    burningEffect: 'Hides usage of Allomancy.',
  },
  Bronze: {
    names: ['Seeker'],
    burningEffect: 'Detects kenetic investiture including usage of Allomancy.',
  },
  Duralumin: {
    names: ['Duralumin Gnat'],
    burningEffect: 'Enhances currently burning metals.',
  },
  Aluminum: {
    names: ['Aluminum Gnat'],
    burningEffect: "Wipes user's Allomanic reserves.",
  },
  Nicrosil: {
    names: ['Nicroburst'],
    burningEffect: "Enhances another Allomancer's currently burning metals.",
  },
  Chromium: {
    names: ['Leecher'],
    burningEffect: "Wipes another Allomancer's Allomanic reserves.",
  },
  Gold: {
    names: ['Augur'],
    burningEffect: "Reveals user's past self.",
  },
  Electrum: {
    names: ['Oracle'],
    burningEffect: "Reveals user's future.",
  },
  Cadmium: {
    names: ['Pulser'],
    burningEffect: 'Slows down time.',
  },
  Bendalloy: {
    names: ['Slider'],
    burningEffect: 'Speeds up time.',
  },
  Malatium: {
    names: [],
    burningEffect: "Allows user to see into another person's past.",
  },
  Atium: {
    names: ['Seer'],
    burningEffect: "Allows user to see another person's future",
  },
};

const feruchemicalPowers: { [key in Metal]: FeruchemicalPower } = {
  Steel: {
    names: ['Steelrunner'],
    tappingEffect: "Speeds up user's physical speed.",
    storingEffect: "Slows down user's physical speed as if moving through thick liquid.",
  },
  Iron: {
    names: ['Skimmer'],
    tappingEffect: 'Makes user heavier.',
    storingEffect: 'Makes user lighter.',
  },
  Pewter: {
    names: ['Brute'],
    tappingEffect: "Enhances user's physical strength.",
    storingEffect: "Diminishes user's physical strength",
  },
  Tin: {
    names: ['Windwhisperer'],
    tappingEffect: "Enhances user's senses. Can tap individual stored senses.",
    storingEffect: 'Diminishes a given sense. User can choose which sense is diminished.',
  },
  Zinc: {
    names: ['Sparker'],
    tappingEffect: "User's thoughts are sped up.",
    storingEffect: "User's thoughts are slowed.",
  },
  Brass: {
    names: ['Firesoul'],
    tappingEffect: "Increases user's body temperature.",
    storingEffect: "Decreases user's body temperature.",
  },
  Copper: {
    names: ['Archivist'],
    tappingEffect: 'Allows user to recall stored memory.',
    storingEffect: 'Makes user forget a memory.',
  },
  Bronze: {
    names: ['Sentry'],
    tappingEffect: 'Allows user to go without sleep.',
    storingEffect: 'Makes user sleep longer than usual.',
  },
  Duralumin: {
    names: ['Connector'],
    tappingEffect: 'Allows user to strengthen connections with others.',
    storingEffect: 'Diminishes connections with others.',
  },
  Aluminum: {
    names: ['Trueself'],
    tappingEffect: UnknownEffect,
    storingEffect: "Diminishes user's spiritual identity. If a metalmind is filled to the point where a user has no identity the user can fill another metalmind to create an unkeyed metalmind.",
  },
  Nicrosil: {
    names: ['Soulbearer'],
    tappingEffect: 'Allows user to use stored Investiture.',
    storingEffect: 'Allows user to create a metalmind that grants the ability to use Investiture. If unkeyed, this metalmind can be used to grant another person the power to tap the stored Investiture.',
  },
  Chromium: {
    names: ['Spinner'],
    tappingEffect: "Increases the user's luck.",
    storingEffect: "Decreases the user's luck.",
  },
  Gold: {
    names: ['Bloodmaker'],
    tappingEffect: 'Allows user to heal.',
    storingEffect: 'Makes user sickly and weak.',
  },
  Electrum: {
    names: ['Pinnacle'],
    tappingEffect: 'Makes user more determined.',
    storingEffect: 'Causes user to become depressed.',
  },
  Cadmium: {
    names: ['Gasper'],
    tappingEffect: 'Allows user to go without breathing.',
    storingEffect: 'Increases the amount of oxygen needed for user to breathe.',
  },
  Bendalloy: {
    names: ['Subsumer'],
    tappingEffect: 'Allows user to go without the need to eat.',
    storingEffect: 'Allows user to eat large quantities of food without becoming full.',
  },
  Malatium: {
    names: [],
    tappingEffect: UnknownEffect,
    storingEffect: UnknownEffect,
  },
  Atium: {
    names: [],
    tappingEffect: 'Allows user to become younger',
    storingEffect: 'Makes user older.',
  },
};

export const twinbornCombos: Twinborn[] = Object.keys(allomanticPowers).flatMap((aMetal) => {
  const allomanticMetal = aMetal as Metal;
  const allomanticPower = allomanticPowers[allomanticMetal];
  return Object.keys(feruchemicalPowers).map((fMetal) => {
    const feruchemicalMetal = fMetal as Metal;
    const feruchemicalPower = feruchemicalPowers[feruchemicalMetal];

    return {
      allomanticPower: { ...allomanticPower, metal: allomanticMetal },
      feruchemicalPower: { ...feruchemicalPower, metal: feruchemicalMetal },
    };
  });
});
