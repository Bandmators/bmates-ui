import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { Button, Tooltip } from '../..';
import { fireEvent, render, screen, waitFor } from '../../../libs/test';

describe('Tooltip', () => {
  it('Show Tooltip message when hover component', async () => {
    const message = 'Tooltip Message';
    render(
      <Tooltip message={message}>
        <Button>Tooltip</Button>
      </Tooltip>,
      {},
    );

    fireEvent.mouseOver(screen.getByText('Tooltip'));

    await waitFor(() => expect(screen.getByText(message)));
  });

  it('Should changed Tooltip direction', async () => {
    const messageLeft = 'Left Tooltip Message';
    const messageBottm = 'Bottom Tooltip Message';
    render(
      <div>
        <Tooltip message={messageLeft} direction="left">
          <Button>TooltipLeft</Button>
        </Tooltip>
        <Tooltip message={messageBottm} direction="bottom">
          <Button>TooltipBottom</Button>
        </Tooltip>
      </div>,
      {},
    );

    let tooltipLeftClassName: string = '';
    let tooltipBottomClassName: string = '';
    fireEvent.mouseOver(screen.getByText('TooltipLeft'));
    await waitFor(() => {
      const tooltip = screen.getByText(messageLeft);
      expect(tooltip).toBeInTheDocument();
      tooltipLeftClassName = tooltip.className;
    });

    fireEvent.mouseOver(screen.getByText('TooltipBottom'));
    await waitFor(() => {
      const tooltip = screen.getByText(messageBottm);
      expect(tooltip).toBeInTheDocument();
      tooltipBottomClassName = tooltip.className;
    });

    expect(tooltipLeftClassName).not.toBe(tooltipBottomClassName);
  });
});
