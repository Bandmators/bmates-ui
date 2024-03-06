import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Avatar, Button, HoverCard, HoverCardContent, HoverCardToggle } from '../../';

const meta = {
  title: 'common/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  args: {
    align: 'center',
  },
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base HoverCard',
  },
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof HoverCard>;

const SampleHoverCardContent = () => {
  const [isFollowing, setIsFollowing] = React.useState<boolean>(false);
  return (
    <HoverCardContent>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', width: '300px' }}>
        <Avatar src="" alt="" />
        <p style={{ fontWeight: 'bold', margin: '8px 0px 0px' }}>Bandmates</p>
        <p style={{ fontWeight: '300', margin: '0px', fontSize: '0.75rem' }}>@BMates</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <Button onClick={() => setIsFollowing(!isFollowing)}>{isFollowing ? 'UnFollow' : 'Follow'}</Button>
      </div>
    </HoverCardContent>
  );
};

export const Default: Story = {
  args: {},
  decorators: [
    () => {
      return (
        <HoverCard>
          <HoverCardToggle>
            <Button>Hover Toggle</Button>
          </HoverCardToggle>
          <SampleHoverCardContent />
        </HoverCard>
      );
    },
  ],
};

export const Align: Story = {
  args: {},
  decorators: [
    () => {
      return (
        <HoverCard align="start">
          <HoverCardToggle>
            <a href="#">@BMates-UI</a>
          </HoverCardToggle>
          <SampleHoverCardContent />
        </HoverCard>
      );
    },
  ],
};

export const Delay: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<HoverCard openDelay={1000} closeDelay={1000} />`',
      },
    },
  },
  args: {},
  decorators: [
    () => {
      return (
        <HoverCard openDelay={1000} closeDelay={1000}>
          <HoverCardToggle>
            <a href="#">@BMates-UI</a>
          </HoverCardToggle>
          <SampleHoverCardContent />
        </HoverCard>
      );
    },
  ],
};

export const Space: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<HoverCard space={48} />`',
      },
    },
  },
  args: {},
  decorators: [
    () => {
      return (
        <HoverCard space={48}>
          <HoverCardToggle>
            <a href="#">@BMates-UI</a>
          </HoverCardToggle>
          <SampleHoverCardContent />
        </HoverCard>
      );
    },
  ],
};
