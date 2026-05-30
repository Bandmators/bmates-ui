import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Select, SelectContent, SelectDivider, SelectItem, SelectLabel, SelectToggle } from '../';
import { fireEvent, render, screen } from '../../libs/test';

const items = [
  {
    label: 'Cat',
    value: 'cat',
  },
  {
    label: 'Dog',
    value: 'dog',
  },
  {
    label: 'Fox',
    value: 'fox',
  },
  {
    label: 'Nilgai',
    value: 'nilgai',
  },
  {
    label: 'Numbird',
    value: 'nunbird',
    disabled: true,
  },
];

describe('UI test', () => {
  it('Should appear SelectContent when click SelectToggle', () => {
    render(
      <Select align="start">
        <SelectToggle>SelectToggle</SelectToggle>
        <SelectContent width={'15rem'}>
          <SelectLabel>Animals</SelectLabel>
          <SelectDivider />
          {items.map(item => (
            <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );

    const toggleBtn = screen.getByText('SelectToggle');
    expect(toggleBtn).toBeInTheDocument();

    // open Select content
    fireEvent.click(toggleBtn);

    const selectLabel = screen.getByText('Animals');
    expect(selectLabel).toBeInTheDocument();

    // test whole items.
    items.forEach(item => {
      const itemLI = screen.getByText(item.label);
      expect(itemLI).toBeInTheDocument();

      if (item.disabled == true) {
        expect(itemLI).toHaveAttribute('aria-disabled', 'true');
        expect(itemLI).toHaveAttribute('data-disabled', 'true');
        expect(itemLI).toHaveAttribute('tabindex', '-1');
      } else expect(itemLI).toHaveAttribute('tabindex', '0');
    });

    // when click item, select content should be closed.
    fireEvent.click(screen.getByText(items[0].label));
    expect(selectLabel).not.toBeInTheDocument();
  });

  it('Should skip disabled option when navigating with keyboard', () => {
    render(
      <Select align="start">
        <SelectToggle>SelectToggle</SelectToggle>
        <SelectContent width={'15rem'}>
          <SelectLabel>Animals</SelectLabel>
          <SelectDivider />
          {items.map(item => (
            <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );

    fireEvent.click(screen.getByText('SelectToggle'));

    const portal = document.getElementById('bmates-portal');
    expect(portal).toBeInTheDocument();

    fireEvent.keyDown(portal as HTMLElement, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: 'Cat' })).toHaveFocus();

    fireEvent.keyDown(portal as HTMLElement, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: 'Dog' })).toHaveFocus();

    fireEvent.keyDown(portal as HTMLElement, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: 'Fox' })).toHaveFocus();

    fireEvent.keyDown(portal as HTMLElement, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: 'Nilgai' })).toHaveFocus();

    fireEvent.keyDown(portal as HTMLElement, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: 'Cat' })).toHaveFocus();
  });

  it('Multiple Select', () => {
    render(
      <Select multi align="center">
        <SelectToggle>SelectToggle</SelectToggle>
        <SelectContent width={'15rem'}>
          <SelectLabel>Animals</SelectLabel>
          <SelectDivider />
          {items.map(item => (
            <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );

    const toggleBtn = screen.getByText('SelectToggle');
    expect(toggleBtn).toBeInTheDocument();

    items.forEach(item => {
      if (item.disabled) return;

      // open Select content
      fireEvent.click(toggleBtn);

      const itemLI = screen.getByRole('option', { name: item.label });
      expect(itemLI).toBeInTheDocument();

      // select item (and close Select content)
      fireEvent.click(itemLI);
      // reopen Select content
      fireEvent.click(toggleBtn);

      // Is Selected?
      const itemLI2 = screen.getByRole('option', { name: item.label });
      expect(itemLI2).toHaveAttribute('aria-selected', 'true');
    });
  });
});
