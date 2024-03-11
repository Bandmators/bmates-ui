import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { Input, InputGroup, Label } from '../..';
import { fireEvent, render, screen } from '../../libs/test';

describe('Input', () => {
  it('Fill out the Input', async () => {
    render(
      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="email" />
      </InputGroup>,
      {},
    );
    const emailValue = 'bandmator@bandmate.com';
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(emailInput, { target: { value: emailValue } });

    expect(emailInput).toHaveValue(emailValue);
  });
});
