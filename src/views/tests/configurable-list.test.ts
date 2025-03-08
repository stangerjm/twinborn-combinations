import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ConfigurableList from '../configurable-list.vue';

const user = userEvent.setup();

test('can filter the list', async () => {
  render(ConfigurableList);

  screen.getByLabelText('Metal filter').focus();
  await user.keyboard('Iron');

  expect(screen.queryAllByText(/Steel/)).not.toBeNull();
});
