import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { Switch } from '../..';
import { fireEvent, render, screen } from '../../../libs/test';

describe('Switch', () => {
  it('Should be change checked value when click the Switch', async () => {
    render(<Switch label="SwitchLabel" id="switch-with-child" />, {});

    const label = screen.getByLabelText(/SwitchLabel/i);
    expect(label).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    // un checked
    expect(checkbox).not.toBeChecked();

    fireEvent.click(label);

    // checked
    expect(checkbox).toBeChecked();
  });

  it('Should be no change when click the Disabled Switch', async () => {
    render(<Switch label="SwitchLabel" disabled={true} />, {});

    const label = screen.getByLabelText(/SwitchLabel/i);
    expect(label).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeDisabled();
  });
});
