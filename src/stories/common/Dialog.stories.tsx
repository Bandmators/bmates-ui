import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogToggle,
  Input,
  InputDesc,
  InputGroup,
  Label,
} from '../..';

const meta = {
  title: 'common/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Dialog',
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    children: (
      <>
        <DialogToggle>Toggle</DialogToggle>
        <DialogContent>
          Content
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogContent>
      </>
    ),
  },
};

export const HideCloseButton: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<DialogContent hideClose />`',
      },
    },
  },
  args: {
    children: (
      <>
        <DialogToggle>Toggle</DialogToggle>
        <DialogContent hideClose>
          Content
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogContent>
      </>
    ),
  },
};
export const EnableBackgroundEvent: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<DialogContent outEvent />`',
      },
    },
  },
  args: {
    children: (
      <>
        <DialogToggle>Toggle</DialogToggle>
        <DialogContent outEvent>
          Content
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogContent>
      </>
    ),
  },
};

export const ToggleAsChild: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`<DialogToggle asChild> <Button/> </DialogToggle>` <br/> `<DialogClose asChild> <Button/> </DialogClose>`',
      },
    },
  },
  args: {
    children: (
      <>
        <DialogToggle asChild>
          <Button
            variant="outline"
            onClick={() => {
              console.log('Event Compose');
            }}
          >
            ToggleAsChild
          </Button>
        </DialogToggle>
        <DialogContent maxWidth={500} hideClose>
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>Great project names are short and memorable.</DialogDescription>
          </DialogHeader>
          <InputGroup style={{ margin: '2rem 0rem' }}>
            <Label htmlFor="project">Project</Label>
            <Input id="project" />
            <InputDesc>You can @mention other users to link to them.</InputDesc>
          </InputGroup>
          <DialogFooter justify="space-between">
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="primary">Create</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </>
    ),
  },
};
