import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../..';
import { fireEvent, render, screen } from '../../libs/test';

describe('Accordion', () => {
  it('Should render accordion with items', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const trigger = screen.getByRole('button', { name: /Item 1/i });
    expect(trigger).toBeInTheDocument();
    expect(screen.getByText(/Content 1/i)).toBeInTheDocument();
  });

  it('Should expand and collapse accordion item on click', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const trigger = screen.getByRole('button', { name: /Item 1/i });

    // Initially collapsed
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('Should only allow one item open in single mode', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const trigger1 = screen.getByRole('button', { name: /Item 1/i });
    const trigger2 = screen.getByRole('button', { name: /Item 2/i });

    // Open first item
    fireEvent.click(trigger1);
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'false');

    // Open second item should close first
    fireEvent.click(trigger2);
    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should allow multiple items open in multiple mode', () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const trigger1 = screen.getByRole('button', { name: /Item 1/i });
    const trigger2 = screen.getByRole('button', { name: /Item 2/i });

    // Open first item
    fireEvent.click(trigger1);
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');

    // Open second item - both should be open
    fireEvent.click(trigger2);
    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should respect defaultValue in single mode', () => {
    render(
      <Accordion type="single" defaultValue="item-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const trigger1 = screen.getByRole('button', { name: /Item 1/i });
    const trigger2 = screen.getByRole('button', { name: /Item 2/i });

    expect(trigger1).toHaveAttribute('aria-expanded', 'false');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should respect defaultValue in multiple mode', () => {
    render(
      <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const trigger1 = screen.getByRole('button', { name: /Item 1/i });
    const trigger2 = screen.getByRole('button', { name: /Item 2/i });

    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should not toggle when item is disabled', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const trigger = screen.getByRole('button', { name: /Item 1/i });

    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('Should render custom indicator', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger indicator={<span data-testid="custom-icon">+</span>}>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const customIcon = screen.getByTestId('custom-icon');
    expect(customIcon).toBeInTheDocument();
    expect(customIcon).toHaveTextContent('+');
  });

  it('Should have proper accessibility attributes', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const trigger = screen.getByRole('button', { name: /Item 1/i });
    const content = screen.getByText(/Content 1/i).parentElement;

    // Trigger should have aria-expanded
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Content should have role="region"
    expect(content).toHaveAttribute('role', 'region');

    // Trigger and content should be linked
    const contentId = content?.getAttribute('id');
    const triggerId = trigger.getAttribute('id');
    expect(trigger).toHaveAttribute('aria-controls', contentId);
    expect(content).toHaveAttribute('aria-labelledby', triggerId);
  });

  it('Should apply custom className to components', () => {
    render(
      <Accordion className="custom-accordion">
        <AccordionItem value="item-1" className="custom-item">
          <AccordionTrigger className="custom-trigger">Item 1</AccordionTrigger>
          <AccordionContent className="custom-content">Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
      {},
    );

    const accordion = screen.getByRole('button', { name: /Item 1/i }).parentElement?.parentElement;
    const item = screen.getByRole('button', { name: /Item 1/i }).parentElement;
    const trigger = screen.getByRole('button', { name: /Item 1/i });
    const content = screen.getByText(/Content 1/i).parentElement;

    expect(accordion).toHaveClass('custom-accordion');
    expect(item).toHaveClass('custom-item');
    expect(trigger).toHaveClass('custom-trigger');
    expect(content).toHaveClass('custom-content');
  });
});
