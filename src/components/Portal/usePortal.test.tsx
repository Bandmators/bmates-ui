import '@testing-library/jest-dom';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  ContextMenu,
  ContextMenuContainer,
  ContextMenuItem,
  ContextMenuProvider,
  Select,
  SelectContent,
  SelectItem,
  SelectToggle,
} from '../';
import { fireEvent, render, screen } from '../../libs/test';

const POPUP_HEIGHT = 540; // natural height of the popup (about 15 rows)
const CAP_VAR = '--bm-portal-max-height';

const originalInnerHeight = Object.getOwnPropertyDescriptor(window, 'innerHeight');

const setViewportHeight = (height: number) => {
  Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: height });
};

const rectOf = (top: number, height: number, left = 0) =>
  ({
    x: left,
    y: top,
    top,
    left,
    right: left + 100,
    bottom: top + height,
    width: 100,
    height,
    toJSON: () => ({}),
  }) as DOMRect;

/**
 * jsdom has no layout engine, so fake just enough of it:
 * - the toggle button sits at `toggleTop`/`toggleLeft`, is `toggleHeight` tall and 100px wide;
 * - the popup is POPUP_HEIGHT tall unless the hook capped it, like a browser would.
 */
const mockLayout = (toggleTop: number, toggleHeight = 40, toggleLeft = 0) => {
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (this: HTMLElement) {
    if (this.id !== 'bmates-portal') return 0;
    const cap = Number.parseFloat(this.style.getPropertyValue(CAP_VAR));
    return Number.isNaN(cap) ? POPUP_HEIGHT : Math.min(POPUP_HEIGHT, cap);
  });
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    return this.tagName === 'BUTTON' ? rectOf(toggleTop, toggleHeight, toggleLeft) : rectOf(0, 0);
  });
};

const getPortal = () => {
  const portal = document.getElementById('bmates-portal');
  if (!portal) throw new Error('portal is not open');
  return portal;
};

const popup = () => {
  const portal = getPortal();
  const top = Number.parseFloat(portal.style.top);
  const height = portal.offsetHeight;
  return { portal, top, height, bottom: top + height };
};

const renderSelect = (align?: 'start' | 'center' | 'end') =>
  render(
    <Select align={align}>
      <SelectToggle>Animals</SelectToggle>
      <SelectContent>
        {Array.from({ length: 20 }, (_, index) => (
          <SelectItem key={index} value={`item-${index}`}>
            {`Item ${index}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>,
  );

describe('usePortal viewport fitting', () => {
  beforeEach(() => {
    setViewportHeight(700);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalInnerHeight) Object.defineProperty(window, 'innerHeight', originalInnerHeight);
  });

  it('opens below the toggle without a cap when the popup fits', () => {
    mockLayout(20);
    renderSelect();
    fireEvent.click(screen.getByText('Animals'));

    const { portal, top } = popup();
    expect(top).toBe(60); // toggle bottom
    expect(portal).not.toHaveAttribute('data-bm-capped');
    expect(portal.style.getPropertyValue(CAP_VAR)).toBe('');
  });

  it('flips above the toggle, uncapped, when only the space above is big enough', () => {
    mockLayout(600);
    renderSelect();
    fireEvent.click(screen.getByText('Animals'));

    const { portal, top } = popup();
    expect(top).toBe(600 - POPUP_HEIGHT);
    expect(portal).not.toHaveAttribute('data-bm-capped');
  });

  it('never puts the popup above the viewport when it fits neither above nor below', () => {
    // 280px free below, 380px free above, 540px needed: the old code flipped above and ended up at top: -160px.
    mockLayout(380);
    renderSelect();
    fireEvent.click(screen.getByText('Animals'));

    const { portal, top, height, bottom } = popup();
    expect(portal).toHaveAttribute('data-bm-capped');
    expect(top).toBeGreaterThanOrEqual(0);
    expect(bottom).toBeLessThanOrEqual(380); // ends at the toggle
    expect(height).toBeLessThan(POPUP_HEIGHT);
  });

  it('uses the roomier side and caps the popup to it', () => {
    // 290px toggle bottom: 410px free below, 250px free above
    mockLayout(250);
    renderSelect();
    fireEvent.click(screen.getByText('Animals'));

    const { portal, top, bottom } = popup();
    expect(portal).toHaveAttribute('data-bm-capped');
    expect(top).toBe(290); // below the toggle
    expect(bottom).toBeLessThanOrEqual(700);
  });

  it('recalculates the cap when the window is resized', () => {
    mockLayout(20);
    renderSelect();
    fireEvent.click(screen.getByText('Animals'));
    expect(getPortal()).not.toHaveAttribute('data-bm-capped');

    setViewportHeight(400);
    fireEvent(window, new Event('resize'));

    const { portal, bottom } = popup();
    expect(portal).toHaveAttribute('data-bm-capped');
    expect(bottom).toBeLessThanOrEqual(400);
  });

  it('keeps a context menu opened near the middle of a short window on screen', () => {
    // no toggle element: the click position is the anchor
    mockLayout(0);
    render(
      <ContextMenuProvider>
        <ContextMenuContainer data-testid="area">area</ContextMenuContainer>
        <ContextMenu>
          {Array.from({ length: 20 }, (_, index) => (
            <ContextMenuItem key={index}>{`Action ${index}`}</ContextMenuItem>
          ))}
        </ContextMenu>
      </ContextMenuProvider>,
    );

    fireEvent.contextMenu(screen.getByTestId('area'), { button: 2, clientX: 10, clientY: 380 });

    const { top, bottom } = popup();
    expect(top).toBeGreaterThanOrEqual(0);
    expect(bottom).toBeLessThanOrEqual(700);
  });

  it('aligns the popup right edge with the toggle when align is end, counting the scrollbar', () => {
    // toggle spans x 300..400; the popup is 160px wide including a 15px scrollbar.
    mockLayout(20, 40, 300);
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
      return this.id === 'bmates-portal' ? 160 : 0;
    });
    vi.spyOn(Element.prototype, 'clientWidth', 'get').mockImplementation(function (this: Element) {
      return this.id === 'bmates-portal' ? 145 : 0;
    });
    renderSelect('end');
    fireEvent.click(screen.getByText('Animals'));

    const left = Number.parseFloat(getPortal().style.left);
    expect(left).toBe(240); // 300 + 100 - 160, i.e. right edges line up at 400
    expect(left + 160).toBe(400);
  });
});
