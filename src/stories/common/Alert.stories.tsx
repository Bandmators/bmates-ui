import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../..';

const meta = {
  title: 'common/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof Alert>;

const icon = (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);
const content = (
  <>
    <AlertIcon>{icon}</AlertIcon>
    <AlertTitle>Changes saved</AlertTitle>
    <AlertDescription>Your documentation is ready to publish.</AlertDescription>
  </>
);

export const Info: Story = {
  args: { variant: 'info', children: content },
  decorators: [
    Story => (
      <div style={{ width: '30rem' }}>
        <Story />
      </div>
    ),
  ],
};
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.75rem', width: '30rem' }}>
      {(['info', 'success', 'warning', 'danger'] as const).map(variant => (
        <Alert key={variant} variant={variant}>
          {content}
        </Alert>
      ))}
    </div>
  ),
};
