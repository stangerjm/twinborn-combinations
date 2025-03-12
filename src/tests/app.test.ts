import { beforeEach, expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import App from '../App.vue';
import { twinbornCombos } from '../data/twinborn-combinations';

Element.prototype.scrollIntoView = vi.fn();

const user = userEvent.setup();

describe('App view', () => {
  beforeEach(() => {
    render(App);
  });

  test('list can be filtered by user input', async () => {
    screen.getByLabelText('Metal filter').focus();
    await user.keyboard('Iron');

    const filteredToIron = screen.queryAllByLabelText('Twinborn').every((twinborn) => twinborn.textContent?.includes('Iron'));
    expect(filteredToIron).toBe(true);
  });

  test('list can be filtered by clicking an allomantic filter', async () => {
    screen.getByLabelText('Metal filter').focus();
    await user.click(screen.getByText('Allomantic metal'));
    await user.click(screen.getByText('Pewter'));

    
    const filteredToPewter = screen.queryAllByLabelText('Twinborn').every((twinborn) => {
      return twinborn.querySelector('.twinborn-combination--allomanticMetal')?.textContent?.includes('Pewter');
    });

    expect(filteredToPewter).toBe(true);
  });

  test('list can be filtered by clicking a feruchemical filter', async () => {
    screen.getByLabelText('Metal filter').focus();
    await user.click(screen.getByText('Feruchemical metal'));
    await user.click(screen.getByText('Copper'));

    
    const filteredToCopper = screen.queryAllByLabelText('Twinborn').every((twinborn) => {
      return twinborn.querySelector('.twinborn-combination--feruchemicalMetal')?.textContent?.includes('Copper');
    });

    expect(filteredToCopper).toBe(true);
  });

  test('list can be filtered by a feruchemical and allomantic metal', async () => {
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
    screen.getByLabelText('Metal filter').focus();
    await user.click(screen.getByText('Compounders'));

    const compoundersOnly = screen.queryAllByLabelText('Twinborn').every((twinborn) => {
      const feruchemicalMetal = twinborn?.querySelector('.twinborn-combination--feruchemicalMetal')?.textContent?.replace(/\([^)]*\)/g, '').trim();
      const allomanticMetal = twinborn?.querySelector('.twinborn-combination--allomanticMetal')?.textContent?.replace(/\([^)]*\)/g, '').trim();

      return feruchemicalMetal?.toLowerCase() === allomanticMetal?.toLowerCase();
    });

    expect(compoundersOnly).toBe(true);
  });

  test('can select compounders only via keyboard', async () => {
    screen.getByLabelText('Metal filter').focus();
    await user.keyboard('{ArrowDown>3}');
    await user.keyboard('{enter}');

    const compoundersOnly = screen.queryAllByLabelText('Twinborn').every((twinborn) => {
      const feruchemicalMetal = twinborn?.querySelector('.twinborn-combination--feruchemicalMetal')?.textContent?.replace(/\([^)]*\)/g, '').trim();
      const allomanticMetal = twinborn?.querySelector('.twinborn-combination--allomanticMetal')?.textContent?.replace(/\([^)]*\)/g, '').trim();

      return feruchemicalMetal?.toLowerCase() === allomanticMetal?.toLowerCase();
    });

    expect(compoundersOnly).toBe(true);
    expect(screen.queryByText('Compounders only')).not.toBe(null);
  });

  test('list can be filtered by typing a allomantic metal filter', async () => {
    screen.getByLabelText('Metal filter').focus();
    await user.keyboard('Allomantic metal = Brass');
    await user.keyboard('{enter}');

    const filteredToBrass = screen.queryAllByLabelText('Twinborn').every((twinborn) => {
      return twinborn.querySelector('.twinborn-combination--allomanticMetal')?.textContent?.includes('Brass (Soother)');
    });

    expect(filteredToBrass).toBe(true);
  });

  test('ignores searches that contain an "=" character', async () => {
    screen.getByLabelText('Metal filter').focus();
    await user.keyboard('test = Brass');

    expect(screen.queryAllByLabelText('Twinborn').length).toBe(Object.keys(twinbornCombos).length);
  });

  test('can select an allomantic filter via keyboard', async () => {
    screen.getByLabelText('Metal filter').focus();
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{enter}');
    await user.keyboard('{ArrowDown>2}');
    await user.keyboard('{enter}');

    const filteredToIron = screen.queryAllByLabelText('Twinborn').every((twinborn) => twinborn.textContent?.includes('Iron'));
    expect(filteredToIron).toBe(true);
    expect(screen.queryByText('Allomantic metal = Iron')).not.toBe(null);
  });

  test('can select a feruchemical filter via keyboard', async () => {
    screen.getByLabelText('Metal filter').focus();
    await user.keyboard('{ArrowDown>2}');
    await user.keyboard('{enter}');
    await user.keyboard('{ArrowDown>2}');
    await user.keyboard('{enter}');

    const filteredToIron = screen.queryAllByLabelText('Twinborn').every((twinborn) => twinborn.textContent?.includes('Iron'));
    expect(filteredToIron).toBe(true);
    expect(screen.queryByText('Feruchemical metal = Iron')).not.toBe(null);
  });

  test('can expand and collapse a metal section by keyboard', async () => {
    screen.getAllByLabelText('Twinborn')[0].focus();
    await user.keyboard('{enter}');

    expect(screen.getAllByLabelText('Twinborn')[0].getAttribute('aria-expanded')).toBe('true');

    await user.keyboard('{enter}');

    expect(screen.getAllByLabelText('Twinborn')[0].getAttribute('aria-expanded')).toBe('false');
  });

  test('can expand and collapse a metal section by clicking', async () => {
    const combo = screen.getAllByLabelText('Twinborn')[0];
    await user.click(combo);

    expect(screen.getAllByLabelText('Twinborn')[0].getAttribute('aria-expanded')).toBe('true');

    await user.click(combo);

    expect(screen.getAllByLabelText('Twinborn')[0].getAttribute('aria-expanded')).toBe('false');
  });
});
