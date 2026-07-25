import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../..';
import { fireEvent, render, screen } from '../../libs/test';

it('selects a tab and exposes the matching panel', () => {
  render(
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Preview panel</TabsContent>
      <TabsContent value="code">Code panel</TabsContent>
    </Tabs>,
    {},
  );

  const codeTab = screen.getByRole('tab', { name: 'Code' });
  fireEvent.click(codeTab);

  expect(codeTab).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByText('Preview panel')).toHaveAttribute('hidden');
  expect(screen.getByText('Code panel')).not.toHaveAttribute('hidden');
});

it('applies the requested size to the tab root and triggers', () => {
  render(
    <Tabs defaultValue="preview" size="sm">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
    </Tabs>,
    {},
  );

  expect(screen.getByRole('tablist').parentElement).toHaveClass('bm-tabs--size-sm');
  expect(screen.getByRole('tab', { name: 'Preview' })).toHaveClass('bm-tabs__trigger--size-sm');
});
