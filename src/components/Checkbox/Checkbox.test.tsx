import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Checkbox, Label } from '../../';
import { fireEvent, render, screen } from '../../libs/test';

describe('Checkbox', () => {
  it('Checkbox icon must be customizable and work when clicked.', () => {
    render(
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', lineHeight: '1' }}>
        <Checkbox
          id="checkbox-test"
          role="checkbox-test"
          iconEl={
            <svg viewBox="0 0 24 24" role="checkbox-icon">
              <path d="M5 12l5 5l08 -10"></path>
            </svg>
          }
        />
        <div>
          <Label htmlFor="checkbox-with-text" style={{ marginLeft: '0px' }}>
            Accept terms and conditions
          </Label>
          <p style={{ margin: '4px 0px', color: 'gray', fontSize: '0.875rem' }}>
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>,
    );

    const checkbox = screen.getByRole('checkbox-test');
    expect(checkbox).toBeInTheDocument();

    const checkIcon = document.querySelector('svg[role="checkbox-icon"]');
    expect(checkIcon).toBeInTheDocument();

    const styledEl = checkIcon?.parentElement;
    expect(styledEl).toBeInTheDocument();

    if (styledEl) {
      const beforeClassName = styledEl.className;
      const beforeChecked = checkbox.ariaChecked;

      fireEvent.click(checkbox);

      expect(styledEl.className).not.toBe(beforeClassName);
      expect(styledEl.ariaChecked).not.toBe(beforeChecked);
    } else {
      console.error('styledEl is null.');
    }
  });
});
