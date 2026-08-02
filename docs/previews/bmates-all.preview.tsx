import * as UI from 'bmates-ui';
import React from 'react';

type Props = { component: string };
type DataTableRow = { id: string; name: string; role: string };
const h = React.createElement;

export default function BMatesComponentPreview({ component }: Props) {
  switch (component) {
    case 'accordion':
      return h(
        UI.Accordion,
        { defaultValue: 'one' },
        h(
          UI.AccordionItem,
          { value: 'one' },
          h(UI.AccordionTrigger, null, 'Account'),
          h(UI.AccordionContent, null, 'Manage your profile.'),
        ),
        h(
          UI.AccordionItem,
          { value: 'two' },
          h(UI.AccordionTrigger, null, 'Billing'),
          h(UI.AccordionContent, null, 'View payment methods.'),
        ),
      );
    case 'alert':
      return h(UI.Alert, { variant: 'info' }, 'Your changes have been saved.');
    case 'avatar':
      return h(UI.Avatar, { src: 'https://i.pravatar.cc/96?img=12', alt: 'Jane Doe' });
    case 'badge':
      return h(UI.Badge, { variant: 'success' }, 'Active');
    case 'button':
      return h(UI.Button, { onClick: () => undefined }, 'Save changes');
    case 'card':
      return h(
        UI.Card,
        null,
        h(UI.CardHead, null, h(UI.CardTitle, null, 'Project status'), h(UI.CardDesc, null, 'Updated just now')),
        h(UI.CardBody, null, 'All systems are operational.'),
      );
    case 'checkbox':
      return h(UI.Checkbox, { defaultChecked: true }, 'Send me product updates');
    case 'context-menu':
      return h(
        UI.ContextMenuProvider,
        null,
        h(UI.ContextMenuContainer, null, 'Right-click me'),
        h(UI.ContextMenu, null, h(UI.ContextMenuItem, null, 'Rename'), h(UI.ContextMenuItem, null, 'Delete')),
      );
    case 'data-table':
      return h(UI.DataTable, {
        columns: [
          { id: 'name', header: 'Name', accessor: (row: DataTableRow) => row.name, sortable: true },
          { id: 'role', header: 'Role', accessor: (row: DataTableRow) => row.role },
        ],
        data: [
          { id: 'jane', name: 'Jane Doe', role: 'Designer' },
          { id: 'sam', name: 'Sam Lee', role: 'Engineer' },
        ],
        getRowId: (row: DataTableRow) => row.id,
        filterable: true,
      });
    case 'dialog':
      return h(
        UI.Dialog,
        null,
        h(UI.DialogToggle, null, 'Open dialog'),
        h(
          UI.DialogContent,
          null,
          h('h2', null, 'Delete project?'),
          h('p', null, 'This action cannot be undone.'),
          h(UI.DialogClose, null, 'Cancel'),
        ),
      );
    case 'dropdown':
      return h(
        UI.Dropdown,
        null,
        h(UI.DropdownToggle, null, 'Actions'),
        h(UI.DropdownContent, null, h(UI.DropdownItem, null, 'Edit'), h(UI.DropdownItem, null, 'Duplicate')),
      );
    case 'hover-card':
      return h(
        UI.HoverCard,
        null,
        h(UI.HoverCardToggle, null, '@bmates'),
        h(UI.HoverCardContent, null, h('strong', null, 'BMates UI'), h('p', null, 'A React component library.')),
      );
    case 'input':
      return h(UI.Input, { type: 'email', placeholder: 'you@example.com', 'aria-label': 'Email address' });
    case 'label':
      return h(UI.Label, { htmlFor: 'preview-email' }, 'Email address');
    case 'pagination':
      return h(
        UI.Pagination,
        null,
        h(
          UI.PaginationContent,
          null,
          h(UI.PaginationPreviousLink, null),
          h(UI.PaginationItem, null, h(UI.PaginationLink, { selected: true }, '1')),
          h(UI.PaginationItem, null, h(UI.PaginationLink, null, '2')),
        ),
      );
    case 'provider':
      return h(UI.BMatesProvider, null, h(UI.Button, null, 'Ready'));
    case 'search':
      return h(
        UI.Search,
        null,
        h(UI.SearchToggle, null, 'Search'),
        h(
          UI.SearchContent,
          null,
          h(UI.SearchInput, { placeholder: 'Search projects' }),
          h(UI.SearchItem, null, 'Design system'),
        ),
      );
    case 'select':
      return h(
        UI.Select,
        { align: 'start' },
        h(UI.SelectToggle, null, 'Select a country'),
        h(
          UI.SelectContent,
          { width: '16rem' },
          h(UI.SelectItem, { value: 'kr' }, 'Korea'),
          h(UI.SelectItem, { value: 'us' }, 'United States'),
        ),
      );
    case 'switch':
      return h(UI.Switch, { defaultChecked: true, 'aria-label': 'Enable notifications' });
    case 'table':
      return h(
        UI.Table,
        null,
        h(UI.TableHeader, null, h(UI.TableRow, null, h(UI.TableHead, null, 'Name'), h(UI.TableHead, null, 'Status'))),
        h(
          UI.TableBody,
          null,
          h(UI.TableRow, null, h(UI.TableCell, null, 'Design system'), h(UI.TableCell, null, 'Ready')),
        ),
      );
    case 'tabs':
      return h(
        UI.Tabs,
        { defaultValue: 'overview' },
        h(
          UI.TabsList,
          null,
          h(UI.TabsTrigger, { value: 'overview' }, 'Overview'),
          h(UI.TabsTrigger, { value: 'activity' }, 'Activity'),
        ),
        h(UI.TabsContent, { value: 'overview' }, 'Project overview'),
        h(UI.TabsContent, { value: 'activity' }, 'Recent activity'),
      );
    case 'textarea':
      return h(UI.Textarea, { rows: 4, placeholder: 'Write a message', 'aria-label': 'Message' });
    case 'toast':
      return h(ToastPreview);
    case 'toggle':
      return h(UI.Toggle, { 'aria-label': 'Toggle bold' }, 'Bold');
    case 'tooltip':
      return h(UI.Tooltip, { content: 'Save the current changes' }, h(UI.Button, { 'aria-label': 'Save' }, 'Save'));
    default:
      return null;
  }
}

function ToastPreview() {
  const { toast } = UI.useToast();
  return h(
    React.Fragment,
    null,
    h(UI.Button, { onClick: () => toast({ title: 'Project saved', variant: 'success' }) }, 'Show toast'),
    h(UI.Toaster, { position: 'bottom-right' }),
  );
}
