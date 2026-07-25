import { render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Button', () => {
  it('renders its public variant classes', () => {
    render(
      <Button variant="primary" size="lg" full>
        Save
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(
      'bm-button',
      'bm-button--variant-primary',
      'bm-button--size-lg',
      'bm-button--full',
    );
  });

  it('uses the native disabled state without a disabled modifier class', () => {
    render(<Button disabled>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    expect(button).not.toHaveClass('bm-button--disabled');
  });
});
