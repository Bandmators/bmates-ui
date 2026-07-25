import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../..';

const meta = {
  title: 'common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Accessible tabbed content with keyboard navigation.',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof Tabs>;

function ControlledTabs() {
  const [value, setValue] = React.useState('preview');

  return (
    <Tabs value={value} defaultValue="preview" onValueChange={setValue} style={{ width: '24rem' }}>
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" style={{ paddingTop: '1rem' }}>
        The selected value is controlled by the parent component.
      </TabsContent>
      <TabsContent value="code" style={{ paddingTop: '1rem' }}>
        Current value: <code>{value}</code>
      </TabsContent>
    </Tabs>
  );
}

function ExampleTabs({ defaultValue = 'preview', size = 'md' }: { defaultValue?: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <Tabs defaultValue={defaultValue} size={size} style={{ width: '24rem' }}>
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" style={{ paddingTop: '1rem' }}>
        Preview content is visible first.
      </TabsContent>
      <TabsContent value="code" style={{ paddingTop: '1rem' }}>
        <code>const answer = 42;</code>
      </TabsContent>
      <TabsContent value="notes" style={{ paddingTop: '1rem' }}>
        Use Arrow keys, Home, or End to move between tabs.
      </TabsContent>
    </Tabs>
  );
}

export const Default: Story = {
  render: () => <ExampleTabs />,
};

export const InitiallySelected: Story = {
  render: () => <ExampleTabs defaultValue="code" />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <ExampleTabs size="sm" />
      <ExampleTabs size="md" />
      <ExampleTabs size="lg" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => <ControlledTabs />,
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="preview" style={{ width: '24rem' }}>
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code" disabled>
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" style={{ paddingTop: '1rem' }}>
        The Code tab is unavailable.
      </TabsContent>
      <TabsContent value="code" style={{ paddingTop: '1rem' }}>
        Hidden content.
      </TabsContent>
    </Tabs>
  ),
};
