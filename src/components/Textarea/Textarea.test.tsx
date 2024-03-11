import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { InputDesc, InputGroup, Label, Textarea } from '../..';
import { fireEvent, render, screen } from '../../libs/test';

describe('Textarea', () => {
  it('Fill out the Textarea', async () => {
    render(
      <InputGroup>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="bio" />
        <InputDesc>You can @mention other users to link to them.</InputDesc>
      </InputGroup>,
      {},
    );
    const bioMsgValue = 'Hi, I am Bandmator';
    const bioTextarea = screen.getByLabelText(/bio/i);

    fireEvent.change(bioTextarea, { target: { value: bioMsgValue } });

    expect(bioTextarea).toHaveValue(bioMsgValue);
  });
});
