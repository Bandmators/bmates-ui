import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';

import {
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownShortcut,
  DropdownToggle,
} from '../';
import { fireEvent, render, screen } from '../../libs/test';

describe('UI test', () => {
  it('Should appear DropdownContent when click DropdownToggle', () => {
    render(
      <Dropdown>
        <DropdownToggle>DropdownToggle</DropdownToggle>
        <DropdownContent width={'15rem'}>
          <DropdownLabel>Share Social</DropdownLabel>
          <DropdownDivider />
          <DropdownItem>
            GitHub
            <DropdownShortcut>⌘+T</DropdownShortcut>
          </DropdownItem>

          <DropdownItem disabled>Facebook</DropdownItem>
          <DropdownItem>Twitter</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const toggleBtn = screen.getByText('DropdownToggle');
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);

    const dropdownLabel = screen.getByText('Share Social');
    expect(dropdownLabel).toBeInTheDocument();

    expect(screen.getByText('Facebook')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Facebook')).toHaveAttribute('data-disabled', 'true');

    const dropdownItem = screen.getByText('Twitter');
    expect(dropdownItem).toBeInTheDocument();

    fireEvent.click(dropdownItem);

    expect(dropdownLabel).not.toBeInTheDocument();
  });

  it('Should skip disabled menu item when navigating with keyboard', () => {
    render(
      <Dropdown>
        <DropdownToggle>DropdownToggle</DropdownToggle>
        <DropdownContent width={'15rem'}>
          <DropdownLabel>Share Social</DropdownLabel>
          <DropdownDivider />
          <DropdownItem>GitHub</DropdownItem>
          <DropdownItem disabled>Facebook</DropdownItem>
          <DropdownItem>Twitter</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    fireEvent.click(screen.getByText('DropdownToggle'));

    const portal = document.getElementById('bmates-portal');
    expect(portal).toBeInTheDocument();

    fireEvent.keyDown(portal as HTMLElement, { key: 'ArrowDown' });
    expect(screen.getByText('GitHub')).toHaveFocus();

    fireEvent.keyDown(portal as HTMLElement, { key: 'ArrowDown' });
    expect(screen.getByText('Twitter')).toHaveFocus();
  });
});
