import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { Button, Toaster, useToast } from '../..';
import { fireEvent, render, screen, waitFor } from '../../../libs/test';
import { ToastData } from './type';

const ToastForTest = ({ ...props }: Omit<ToastData, 'toastId'>) => {
  const { toast } = useToast();

  return (
    <>
      <Button
        onClick={() => {
          toast({ ...props });
        }}
      >
        ToastButton
      </Button>
    </>
  );
};

describe('Toast', () => {
  it('Fill out the Textarea', async () => {
    const toastData = {
      title: 'Toast Title',
      description: `When you click Toast, containing 'data' 'action' is executed.`,
      variant: 'primary',
      time: 5000,
      data: 'Hi',
      action: (data: unknown) => {
        const el = document.querySelector('#test-action');
        if (el) {
          el.className = data as string;
        }
      },
    };
    render(
      <>
        <ToastForTest {...toastData} />
        <p id="test-action">test-action</p>
        <Toaster />
      </>,
      {},
    );

    const toastBtn = screen.getByText('ToastButton');
    expect(toastBtn).toBeInTheDocument();

    fireEvent.click(toastBtn);

    // show title
    const title = screen.getByText(toastData.title);
    expect(title).toBeInTheDocument();

    // show description
    const description = screen.getByText(toastData.description);
    expect(description).toBeInTheDocument();

    // work action with data
    const testaction = screen.getByText('test-action');
    expect(testaction).toBeInTheDocument();
    expect(testaction.className).not.toBe(toastData.data);

    fireEvent.click(description);

    waitFor(() => {
      // when click toast, it should be removed.
      expect(title).not.toBeInTheDocument();

      // work action with data
      expect(testaction.className).toBe(toastData.data);
    });
  });
});
