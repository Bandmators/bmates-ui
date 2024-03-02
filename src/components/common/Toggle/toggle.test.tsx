import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { Toggle } from '../..';
import { fireEvent, render, screen } from '../../../libs/test';

describe('Toggle', () => {
  it('Should be changed style', async () => {
    render(<Toggle>Toggle</Toggle>, {});
    const toggleBtn = screen.getByText('Toggle');

    const beforeBG = toggleBtn.className;
    fireEvent.click(toggleBtn);
    const afterBG = toggleBtn.className;

    expect(beforeBG).not.toBe(afterBG);
  });
});
