import '@testing-library/jest-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';

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
} from '../../';
import { fireEvent, render, screen } from '../../../libs/test';

describe('Dialog', () => {
  it('Should appear DialogContent when click DialogToggle', () => {
    render(
      <Dialog>
        <DialogToggle asChild>
          <Button
            variant="outline"
            onClick={() => {
              console.log('Event Compose');
            }}
          >
            ToggleButton
          </Button>
        </DialogToggle>
        <DialogContent maxWidth={500} outEvent>
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
      </Dialog>,
    );

    const toggleBtn = screen.getByText('ToggleButton');
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);

    const projectLabel = screen.getByLabelText(/project/i);
    expect(projectLabel).toBeInTheDocument();
    fireEvent.change(projectLabel, { target: { value: 'blur blur' } });

    const closeBtn = screen.getByText('Close');
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);

    expect(projectLabel).not.toBeInTheDocument();

    fireEvent.click(toggleBtn);

    const dialogTitle = screen.getByText('Create project');
    expect(dialogTitle).toBeInTheDocument();

    const dialogBGs = document.getElementsByClassName('bmates-modal-bg');
    expect(dialogBGs.length).toBe(1);

    fireEvent.click(dialogBGs[0]);

    expect(closeBtn).not.toBeInTheDocument();
  });
});
