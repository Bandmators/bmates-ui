import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { Alert, AlertDescription, AlertTitle } from '../..';
import { render, screen } from '../../libs/test';

it('renders the alert variant and accessible role', () => {
  render(
    <Alert variant="warning">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Review this change before continuing.</AlertDescription>
    </Alert>,
    {},
  );

  expect(screen.getByRole('alert')).toHaveClass('bm-alert--warning');
  expect(screen.getByText('Heads up')).toHaveClass('bm-alert__title');
});
