const UnknownEffect = 'Unknown';
enum Metal {
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
};

type FeruchemicalPower = {
  tappingEffect: string;
  storingEffect: string;
};

type AllomanticPower = {
  burningEffect: string;
};

type TwinbornCombos = `${Metal}-${Metal}`;

type Twinborn = {
  allomancy: AllomanticPower;
  feruchemy: AllomanticPower;
};

const allomanticPowers: { [key in Metal]: AllomanticPower } = {
  Steel: { burningEffect: 'Allows user to push on metal.' },
  Iron: { burningEffect: 'Allows user to pull on metal.' },
  Pewter: { burningEffect: "Enhances user's physical abilities." },
  Tin: { burningEffect: "Enhances user's senses." },
  Zinc: { burningEffect: "Allows user to riot other people's emotions." },
  Brass: { burningEffect: "Allows user to soothe other people's emotions." },
  Copper: { burningEffect: 'Hides usage of Allomancy.' },
  Bronze: { burningEffect: 'Detects kenetic investiture including usage of Allomancy.' },
  Duralumin: { burningEffect: 'Enhances currently burning metals.' },
  Aluminum: { burningEffect: "Wipes user's Allomanic reserves." },
  Nicrosil: { burningEffect: "Enhances another Allomancer's currently burning metals." },
  Chromium: { burningEffect: "Wipes another Allomancer's Allomanic reserves." },
  Gold: { burningEffect: "Reveals user's past self." },
  Electrum: { burningEffect: "Reveals user's future." },
  Cadmium: { burningEffect: 'Slows down time.' },
  Bendalloy: { burningEffect: 'Speeds up time.' },
  Malatium: { burningEffect: "Allows user to see into another person's past." },
  Atium: { burningEffect: "Allows user to see another person's future" },
};

const feruchemicalPowers: { [key in Metal]: FeruchemicalPower } = {
  Steel: { tappingEffect: "Speeds up user's physical speed.", storingEffect: "Slows down user's physical speed as if moving through thick liquid." },
  Iron: { tappingEffect: 'Makes user heavier.', storingEffect: 'Makes user lighter.' },
  Pewter: { tappingEffect: "Enhances user's physical strength.", storingEffect: "Diminishes user's physical strength" },
  Tin: { tappingEffect: "Enhances user's senses. Can tap individual stored senses.", storingEffect: 'Diminishes a given sense. User can choose which sense is diminished.' },
  Zinc: { tappingEffect: "User's thoughts are sped up.", storingEffect: "User's thoughts are slowed." },
  Brass: { tappingEffect: "Increases user's body temperature.", storingEffect: "Decreases user's body temperature." },
  Copper: { tappingEffect: 'Allows user to recall stored memory.', storingEffect: 'Makes user forget a memory.' },
  Bronze: { tappingEffect: 'Allows user to go without sleep.', storingEffect: 'Makes user sleep longer than usual.' },
  Duralumin: { tappingEffect: 'Allows user to strengthen connections with others.', storingEffect: 'Diminishes connections with others.' },
  Aluminum: { tappingEffect: UnknownEffect, storingEffect: "Diminishes user's spiritual identity. If a metalmind is filled to the point where a user has no identity the user can fill another metalmind to create an unkeyed metalmind." },
  Nicrosil: { tappingEffect: 'Allows user to use stored Investiture.', storingEffect: 'Allows user to create a metalmind that grants the ability to use Investiture. If unkeyed, this metalmind can be used to grant another person the power to tap the stored Investiture.' },
  Chromium: { tappingEffect: "Increases the user's luck.", storingEffect: "Decreases the user's luck." },
  Gold: { tappingEffect: 'Allows user to heal.', storingEffect: 'Makes user sickly and weak.' },
  Electrum: { tappingEffect: 'Makes user more determined.', storingEffect: 'Causes user to become depressed.' },
  Cadmium: { tappingEffect: 'Allows user to go without breathing.', storingEffect: 'Increases the amount of oxygen needed for user to breathe.' },
  Bendalloy: { tappingEffect: 'Allows user to go without the need to eat.', storingEffect: 'Allows user to eat large quantities of food without becoming full.' },
  Malatium: { tappingEffect: UnknownEffect, storingEffect: UnknownEffect },
  Atium: { tappingEffect: 'Allows user to become younger', storingEffect: 'Makes user older.' },
};

const twinbornCombos = Object.keys(allomanticPowers).flatMap((allomanticMetal) => {
  const allomanticPower = allomanticPowers[allomanticMetal as Metal];
  return Object.keys(feruchemicalPowers).map((feruchemicalMetal) => {
    const feruchemicalPower = feruchemicalPowers[feruchemicalMetal as Metal];
    return {
      twinbornType: `${allomanticMetal}-${feruchemicalMetal}`,
      allomanticPower: { ...allomanticPower, metal: allomanticMetal },
      feruchemicalPower: { ...feruchemicalPower, metal: feruchemicalMetal },
    };
  });
});

console.log(twinbornCombos);
console.log(`Total: ${twinbornCombos.length}`);
