import '@testing-library/jest-dom';
import React from 'react';
import { Route } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { Button, Form, Input, InputDesc, InputGroup, Label, Textarea } from '../';
import { MockRouter, fireEvent, render, screen, waitFor } from '../libs/test';

describe('UI test', () => {
  it('Fill out the Input and Textarea and submit the Form', async () => {
    const handleSubmitFn = vi.fn().mockImplementation(e => e.preventDefault());

    render(
      <MockRouter initialPath="/">
        <Route
          path="/"
          element={
            <Form redirect="submitsuccess" id="form" onSubmit={handleSubmitFn}>
              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email" />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="bio" />
                <InputDesc>You can @mention other users to link to them.</InputDesc>
              </InputGroup>
              <Button type="submit" variant="primary" size="lg">
                Save
              </Button>
            </Form>
          }
        />
        <Route path="/submitsuccess" element={<p>Success</p>} />
      </MockRouter>,
      {},
    );

    const emailInput = screen.getByLabelText(/email/i);
    const bioTextarea = screen.getByLabelText(/bio/i);
    const submitBtn = screen.getByText('Save');

    fireEvent.change(emailInput, { target: { value: 'bandmator@bandmate.com' } });
    fireEvent.change(bioTextarea, { target: { value: 'Hi, I am Bandmator' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      // expect(screen.getByText('End')).toBeInTheDocument();
      expect(handleSubmitFn).toHaveBeenCalledTimes(1);
    });
  });
});
