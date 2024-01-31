import '@testing-library/jest-dom';
import React from 'react';
import { Route } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogToggle,
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownShortcut,
  DropdownToggle,
  Form,
  Input,
  InputDesc,
  InputGroup,
  Label,
  Textarea,
} from '../';
import { MockRouter, fireEvent, render, screen, waitFor } from '../libs/test';

describe('UI test', () => {
  it('Fill out the Input and Textarea and submit the Form', async () => {
    const handleSubmitFn = vi.fn().mockImplementation(e => e.preventDefault());

    render(
      <MockRouter initialPath="/">
        <Route
          path="/"
          element={
            <Form redirect="submitsuccess" id="form" onSubmit={handleSubmitFn}>
              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email" />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="bio" />
                <InputDesc>You can @mention other users to link to them.</InputDesc>
              </InputGroup>
              <Button type="submit" variant="primary" size="lg">
                Save
              </Button>
            </Form>
          }
        />
        <Route path="/submitsuccess" element={<p>Success</p>} />
      </MockRouter>,
      {},
    );

    const emailInput = screen.getByLabelText(/email/i);
    const bioTextarea = screen.getByLabelText(/bio/i);
    const submitBtn = screen.getByText('Save');

    fireEvent.change(emailInput, { target: { value: 'bandmator@bandmate.com' } });
    fireEvent.change(bioTextarea, { target: { value: 'Hi, I am Bandmator' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleSubmitFn).toHaveBeenCalledTimes(1);
    });
  });

  it('Checkbox icon must be customizable and work when clicked.', () => {
    render(
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', lineHeight: '1' }}>
        <Checkbox
          id="checkbox-test"
          role="checkbox-test"
          iconEl={
            <svg viewBox="0 0 24 24" role="checkbox-icon">
              <path d="M5 12l5 5l08 -10"></path>
            </svg>
          }
        />
        <div>
          <Label htmlFor="checkbox-with-text" style={{ marginLeft: '0px' }}>
            Accept terms and conditions
          </Label>
          <p style={{ margin: '4px 0px', color: 'gray', fontSize: '0.875rem' }}>
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>,
    );

    const checkbox = screen.getByRole('checkbox-test');
    expect(checkbox).toBeInTheDocument();

    const checkIcon = document.querySelector('svg[role="checkbox-icon"]');
    expect(checkIcon).toBeInTheDocument();

    const styledEl = checkIcon?.parentElement;
    expect(styledEl).toBeInTheDocument();

    if (styledEl) {
      const beforeBgStyle = styledEl.style.background;
      fireEvent.click(checkbox);

      expect(styledEl).not.toHaveStyle(`background: ${beforeBgStyle}`);
    } else {
      console.error('styledEl is null.');
    }
  });

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

    const dropdownItem = screen.getByText('Twitter');
    expect(dropdownItem).toBeInTheDocument();

    fireEvent.click(dropdownItem);

    expect(dropdownLabel).not.toBeInTheDocument();
  });
});
