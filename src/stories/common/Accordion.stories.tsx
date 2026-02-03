import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../..';

const meta = {
  title: 'common/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    type: 'single',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Accordion type: single allows only one item open, multiple allows multiple items open',
    },
  },
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Accordion',
    docs: {
      description: {
        component: 'Expandable accordion component with smooth transitions and accessibility features.',
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    children: (
      <AccordionItem value="item-1">
        <AccordionTrigger>What is this accordion?</AccordionTrigger>
        <AccordionContent>
          An accordion is a UI pattern that allows you to toggle the visibility of sections. Click the header to expand
          or collapse the content.
        </AccordionContent>
      </AccordionItem>
    ),
  },
};

export const SingleMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Only one item can be open at a time. Opening a new item closes the previous one.',
      },
    },
  },
  args: {
    type: 'single',
    defaultValue: 'item-2',
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>First Item</AccordionTrigger>
          <AccordionContent>
            This is the content of the first accordion item. You can expand or collapse it.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second Item</AccordionTrigger>
          <AccordionContent>
            This is the content of the second accordion item. When opened, the first item will close.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Third Item</AccordionTrigger>
          <AccordionContent>This is the content of the third accordion item.</AccordionContent>
        </AccordionItem>
      </>
    ),
  },
};

export const MultipleMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple items can be open at the same time.',
      },
    },
  },
  args: {
    type: 'multiple',
    defaultValue: ['item-1', 'item-2'],
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>First Item</AccordionTrigger>
          <AccordionContent>
            This is the content of the first accordion item. You can expand or collapse it.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second Item</AccordionTrigger>
          <AccordionContent>
            This is the content of the second accordion item. You can have multiple items open at the same time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Third Item</AccordionTrigger>
          <AccordionContent>This is the content of the third accordion item.</AccordionContent>
        </AccordionItem>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    type: 'single',
    children: (
      <AccordionItem value="item-1" disabled>
        <AccordionTrigger>Disabled Item</AccordionTrigger>
        <AccordionContent>This accordion item is disabled and cannot be toggled.</AccordionContent>
      </AccordionItem>
    ),
  },
};

export const CustomIndicator: Story = {
  args: {
    type: 'single',
    children: (
      <AccordionItem value="item-1">
        <AccordionTrigger
          indicator={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          }
        >
          Click to expand
        </AccordionTrigger>
        <AccordionContent>This accordion has a custom indicator icon instead of the default chevron.</AccordionContent>
      </AccordionItem>
    ),
  },
};

export const LongContent: Story = {
  args: {
    type: 'single',
    children: (
      <AccordionItem value="item-1">
        <AccordionTrigger>Detailed Information</AccordionTrigger>
        <AccordionContent>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.{' '}
          </p>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
            over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </AccordionContent>
      </AccordionItem>
    ),
  },
};
