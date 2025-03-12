import { vi, test, expect } from 'vitest';
import { createApp } from 'vue';

import '../main';

vi.mock('vue', async () => {
  const actual = await import('vue');
  return {
    ...actual,
    createApp: vi.fn(() => ({ mount: vi.fn() })),
  };
});

test('app is created', () => {
  expect(createApp).toHaveBeenCalled();
});
