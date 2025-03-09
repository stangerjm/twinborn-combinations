import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ConfigurableList from '../configurable-list.vue';
import { twinbornCombos } from '../../data/twinborn-combinations';

const user = userEvent.setup();

test('list can be filtered by user input', async () => {
  render(ConfigurableList);

  screen.getByLabelText('Metal filter').focus();
  await user.keyboard('Iron');

  const filteredToIron = screen.queryAllByLabelText('Twinborn').every((twinborn) => twinborn.textContent?.includes('Iron'));
  expect(filteredToIron).toBe(true);
});

test('list can be filtered by clicking an allomantic filter', async () => {
  render(ConfigurableList);

  screen.getByLabelText('Metal filter').focus();
  await user.click(screen.getByText('Allomantic metal'));
  await user.click(screen.getByText('Pewter'));

  
  const filteredToPewter = screen.queryAllByLabelText('Twinborn').every((twinborn) => {
    return twinborn.querySelector('.twinborn-combination--allomanticMetal')?.textContent?.includes('Pewter');
  });

  expect(filteredToPewter).toBe(true);
});

test('list can be filtered by clicking a feruchemical filter', async () => {
  render(ConfigurableList);

  screen.getByLabelText('Metal filter').focus();
  await user.click(screen.getByText('Feruchemical metal'));
  await user.click(screen.getByText('Copper'));

  
  const filteredToCopper = screen.queryAllByLabelText('Twinborn').every((twinborn) => {
    return twinborn.querySelector('.twinborn-combination--feruchemicalMetal')?.textContent?.includes('Copper');
  });

  expect(filteredToCopper).toBe(true);
});

test('list can be filtered by a feruchemical and allomantic metal', async () => {
  render(ConfigurableList);

  screen.getByLabelText('Metal filter').focus();
  await user.click(screen.getByText('Feruchemical metal'));
  await user.click(screen.getByText('Gold'));
  await user.click(screen.getByText('Allomantic metal'));
  await user.click(screen.getByText('Atium'));

  const feruchemicalMetal = screen.queryByLabelText('Twinborn')?.querySelector('.twinborn-combination--feruchemicalMetal')?.textContent;
  const allomanticMetal = screen.queryByLabelText('Twinborn')?.querySelector('.twinborn-combination--allomanticMetal')?.textContent;

  expect(feruchemicalMetal).toBe('Gold (Bloodmaker)');
  expect(allomanticMetal).toBe('Atium (Seer)');
});

test('list can be filtered to show compounders only', async () => {
  render(ConfigurableList);

  screen.getByLabelText('Metal filter').focus();
  await user.click(screen.getByText('Compounders'));

  const compoundersOnly = screen.queryAllByLabelText('Twinborn').every((twinborn) => {
    const feruchemicalMetal = twinborn?.querySelector('.twinborn-combination--feruchemicalMetal')?.textContent?.replace(/\([^)]*\)/g, '').trim();
    const allomanticMetal = twinborn?.querySelector('.twinborn-combination--allomanticMetal')?.textContent?.replace(/\([^)]*\)/g, '').trim();

    return feruchemicalMetal?.toLowerCase() === allomanticMetal?.toLowerCase();
  });

  expect(compoundersOnly).toBe(true);
});

test('list can be filtered by typing a allomantic metal filter', async () => {
  render(ConfigurableList);

  screen.getByLabelText('Metal filter').focus();
  await user.keyboard('Allomantic metal = Brass');
  await user.keyboard('{enter}');

  const filteredToBrass = screen.queryAllByLabelText('Twinborn').every((twinborn) => {
    return twinborn.querySelector('.twinborn-combination--allomanticMetal')?.textContent?.includes('Brass (Soother)');
  });

  expect(filteredToBrass).toBe(true);
});

test('ignores searches that contain an "=" character', async () => {
  render(ConfigurableList);

  screen.getByLabelText('Metal filter').focus();
  await user.keyboard('test = Brass');

  expect(screen.queryAllByLabelText('Twinborn').length).toBe(Object.keys(twinbornCombos).length);
});
