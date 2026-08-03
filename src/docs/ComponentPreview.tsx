import * as React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardDesc,
  CardFooter,
  CardHead,
  CardTitle,
  Checkbox,
  ContextMenu,
  ContextMenuItem,
  ContextMenuProvider,
  DataTable,
  Dialog,
  DialogClose,
  DialogContent,
  DialogToggle,
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownToggle,
  HoverCard,
  HoverCardContent,
  HoverCardToggle,
  Input,
  Label,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Search,
  SearchContent,
  SearchInputToggle,
  SearchItem,
  SearchItemList,
  Select,
  SelectContent,
  SelectItem,
  SelectToggle,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  ToasterProvider,
  Toggle,
  Tooltip,
  useToast,
} from '../index';

type PreviewProps = {
  component: string;
  example?: string;
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.75rem',
};

const portalPreviewStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: 260,
  paddingTop: '3rem',
  width: '100%',
};

const dialogPreviewStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 360,
  width: '100%',
};

const sizes = ['sm', 'md', 'lg'] as const;
const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;
const specialVariants = [...variants, 'outline', 'ghost'] as const;

const PreviewContextMenu = ContextMenu as React.ComponentType<
  React.ComponentProps<typeof ContextMenu> & { disabledAutoFocus?: boolean }
>;
const PreviewDropdownContent = DropdownContent as React.ComponentType<
  React.ComponentProps<typeof DropdownContent> & { disabledAutoFocus?: boolean }
>;
const PreviewHoverCardContent = HoverCardContent as React.ComponentType<
  React.ComponentProps<typeof HoverCardContent> & { disabledAutoFocus?: boolean }
>;
const PreviewSelectContent = SelectContent as React.ComponentType<
  React.ComponentProps<typeof SelectContent> & { disabledAutoFocus?: boolean }
>;

function AccordionPreview({ example }: { example?: string }) {
  const multiple = example === 'multiple';
  const accordionProps: { type: 'multiple'; defaultValue: string[] } | { type: 'single'; defaultValue: string } =
    multiple ? { type: 'multiple', defaultValue: ['one', 'two'] } : { type: 'single', defaultValue: 'one' };
  return (
    <Accordion {...accordionProps}>
      {['one', 'two'].map((value, index) => (
        <AccordionItem key={value} value={value} disabled={example === 'disabled' && index === 1}>
          <AccordionTrigger indicator={example === 'indicator' ? '+' : undefined}>Section {index + 1}</AccordionTrigger>
          <AccordionContent>Content for section {index + 1}.</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function DataTablePreview({ example }: { example?: string }) {
  const data = [
    { id: '1', name: 'Guitar', status: 'Active' },
    { id: '2', name: 'Drums', status: 'Paused' },
    { id: '3', name: 'Bass', status: 'Active' },
  ];
  const columns = [
    { id: 'name', header: 'Instrument', accessor: (row: (typeof data)[number]) => row.name, sortable: true },
    { id: 'status', header: 'Status', accessor: (row: (typeof data)[number]) => row.status },
  ];
  return (
    <DataTable
      columns={columns}
      data={example === 'empty' ? [] : data}
      getRowId={row => row.id}
      selectable={example === 'selectable'}
      filterable={example === 'filterable'}
      emptyMessage="No instruments."
    />
  );
}

function TablePreview({ example }: { example?: string }) {
  if (example === 'sizes') {
    return (
      <div style={{ display: 'grid', gap: '1rem', width: '100%' }}>
        {sizes.map(size => (
          <Table key={size} size={size}>
            <TableBody>
              <TableRow>
                <TableCell>{size}</TableCell>
                <TableCell>Example row</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </div>
    );
  }
  return (
    <Table hoverable={example === 'hoverable'}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Min</TableCell>
          <TableCell>Guitar</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jae</TableCell>
          <TableCell>Drums</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function TabsPreview({ example }: { example?: string }) {
  const [value, setValue] = React.useState('profile');
  return (
    <Tabs
      defaultValue="profile"
      value={example === 'controlled' ? value : undefined}
      onValueChange={example === 'controlled' ? setValue : undefined}
      size={example === 'large' ? 'lg' : 'md'}
    >
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="settings" disabled={example === 'disabled'}>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">Profile content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  );
}

function ToastPreviewContent({ example }: { example?: string }) {
  const { toast } = useToast();
  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: 'Saved',
            description: 'Your changes are ready.',
            variant: example === 'danger' ? 'danger' : 'default',
            time: 3000,
          })
        }
      >
        Show toast
      </Button>
      <Toaster position={example === 'top' ? 'top-right' : 'bottom-right'} />
    </>
  );
}

function ToastPreview({ example }: { example?: string }) {
  return (
    <ToasterProvider>
      <ToastPreviewContent example={example} />
    </ToasterProvider>
  );
}

export default function ComponentPreview({ component, example = 'default' }: PreviewProps) {
  switch (component) {
    case 'accordion':
      return <AccordionPreview example={example} />;
    case 'alert':
      return (
        <div style={{ display: 'grid', gap: '0.75rem', width: '100%' }}>
          {(example === 'variants' ? ['info', 'success', 'warning', 'danger'] : ['info']).map(variant => (
            <Alert key={variant} variant={variant as 'info'}>
              <AlertTitle>{variant}</AlertTitle>
              <AlertDescription>This is a {variant} alert.</AlertDescription>
            </Alert>
          ))}
        </div>
      );
    case 'avatar':
      return (
        <div style={rowStyle}>
          {(example === 'sizes' ? sizes : (['md'] as const)).map(size => (
            <Avatar key={size} src="/logo.png" alt="BMates UI" size={size} />
          ))}
        </div>
      );
    case 'badge':
      return (
        <div style={rowStyle}>
          {(example === 'variants' ? specialVariants : (['primary'] as const)).map(variant => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      );
    case 'button':
      return (
        <div style={rowStyle}>
          {example === 'sizes'
            ? sizes.map(size => (
                <Button key={size} size={size}>
                  {size}
                </Button>
              ))
            : example === 'states'
              ? [
                  <Button key="normal">Normal</Button>,
                  <Button key="disabled" disabled>
                    Disabled
                  </Button>,
                ]
              : specialVariants.map(variant => (
                  <Button key={variant} variant={variant}>
                    {variant}
                  </Button>
                ))}
        </div>
      );
    case 'card':
      return (
        <Card width={example === 'width' ? 420 : 300}>
          <CardHead>
            <CardTitle>Band profile</CardTitle>
            <CardDesc>Card description</CardDesc>
          </CardHead>
          <CardBody>Card body content</CardBody>
          <CardFooter>
            <Button size="sm">Open</Button>
          </CardFooter>
        </Card>
      );
    case 'checkbox':
      return (
        <div style={rowStyle}>
          <Checkbox defaultChecked label="Checked" />
          <Checkbox label="Unchecked" />
          {example === 'states' && <Checkbox disabled label="Disabled" />}
        </div>
      );
    case 'context-menu':
      return (
        <div style={portalPreviewStyle}>
          <ContextMenuProvider>
            <div style={{ padding: '2rem', border: '1px dashed currentColor' }}>Right-click this area</div>
            <PreviewContextMenu width={180} disabledAutoFocus>
              <ContextMenuItem>Open</ContextMenuItem>
              <ContextMenuItem disabled={example === 'disabled'}>Delete</ContextMenuItem>
            </PreviewContextMenu>
          </ContextMenuProvider>
        </div>
      );
    case 'data-table':
      return <DataTablePreview example={example} />;
    case 'dialog':
      return (
        <div style={dialogPreviewStyle}>
          <Dialog>
            <DialogToggle>Open dialog</DialogToggle>
            <DialogContent hideClose={example === 'hide-close'} outEvent={example === 'outside'}>
              <p>Dialog content</p>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      );
    case 'dropdown':
      return (
        <div style={portalPreviewStyle}>
          <Dropdown align={example === 'end' ? 'end' : 'start'} space={example === 'space' ? 16 : 0}>
            <DropdownToggle>Open menu</DropdownToggle>
            <PreviewDropdownContent width={200} disabledAutoFocus>
              <DropdownLabel>Actions</DropdownLabel>
              <DropdownDivider />
              <DropdownItem>Open</DropdownItem>
              <DropdownItem disabled>Delete</DropdownItem>
            </PreviewDropdownContent>
          </Dropdown>
        </div>
      );
    case 'hover-card':
      return (
        <div style={portalPreviewStyle}>
          <HoverCard
            align={example === 'align' ? 'start' : 'center'}
            space={example === 'space' ? 24 : 0}
            openDelay={example === 'delay' ? 800 : 0}
          >
            <HoverCardToggle>
              <Button variant="outline">Hover me</Button>
            </HoverCardToggle>
            <PreviewHoverCardContent disabledAutoFocus>
              <div style={{ padding: '1rem', width: 240 }}>BMates UI profile preview</div>
            </PreviewHoverCardContent>
          </HoverCard>
        </div>
      );
    case 'input':
      return (
        <div style={{ display: 'grid', gap: '0.75rem', width: '100%' }}>
          {example === 'types' ? (
            <>
              <Input type="text" placeholder="Text" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
            </>
          ) : (
            <>
              <Input placeholder="Enabled" />
              <Input disabled placeholder="Disabled" />
            </>
          )}
        </div>
      );
    case 'label':
      return (
        <div style={{ display: 'grid', gap: '0.5rem', width: '100%' }}>
          <Label htmlFor="docs-label-input">Band name</Label>
          <Input id="docs-label-input" placeholder="Enter a name" />
        </div>
      );
    case 'pagination':
      return (
        <Pagination>
          <PaginationContent>
            {[1, 2, 3].map(page => (
              <PaginationItem key={page}>
                <PaginationLink selected={example === 'selected' && page === 2} disabled={example === 'disabled'}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      );
    case 'provider':
      return <Button>Provider child</Button>;
    case 'search':
      return (
        <div style={portalPreviewStyle}>
          <Search align={example === 'end' ? 'end' : 'start'} space={example === 'space' ? 16 : 0}>
            <SearchInputToggle placeholder="Search commands" />
            <SearchContent width={320}>
              <SearchItemList>
                <SearchItem>Open profile</SearchItem>
                <SearchItem disabled={example === 'disabled'}>Delete profile</SearchItem>
              </SearchItemList>
            </SearchContent>
          </Search>
        </div>
      );
    case 'select':
      return (
        <div style={portalPreviewStyle}>
          <Select multi={example === 'multi'} hoverOpen={example === 'hover'} space={example === 'space' ? 16 : 0}>
            <SelectToggle>Select an instrument</SelectToggle>
            <PreviewSelectContent width={240} disabledAutoFocus>
              <SelectItem value="guitar">Guitar</SelectItem>
              <SelectItem value="bass">Bass</SelectItem>
              <SelectItem value="drums" disabled>
                Drums
              </SelectItem>
            </PreviewSelectContent>
          </Select>
        </div>
      );
    case 'switch':
      return (
        <div style={rowStyle}>
          {example === 'variants' ? (
            variants.map(variant => <Switch key={variant} defaultChecked variant={variant} label={variant} />)
          ) : example === 'sizes' ? (
            sizes.map(size => <Switch key={size} defaultChecked size={size} label={size} />)
          ) : (
            <>
              <Switch defaultChecked label="Enabled" />
              <Switch disabled label="Disabled" />
            </>
          )}
        </div>
      );
    case 'table':
      return <TablePreview example={example} />;
    case 'tabs':
      return <TabsPreview example={example} />;
    case 'textarea':
      return (
        <div style={{ display: 'grid', gap: '0.5rem', width: '100%' }}>
          <Textarea placeholder="Write a short introduction" disabled={example === 'disabled'} />
          {example === 'label' && <span>Use the resize handle to adjust the field.</span>}
        </div>
      );
    case 'toast':
      return <ToastPreview example={example} />;
    case 'toggle':
      return (
        <div style={rowStyle}>
          {example === 'sizes' ? (
            sizes.map(size => (
              <Toggle key={size} size={size}>
                B
              </Toggle>
            ))
          ) : (
            <>
              <Toggle selected>Selected</Toggle>
              <Toggle>Off</Toggle>
              <Toggle disabled>Disabled</Toggle>
            </>
          )}
        </div>
      );
    case 'tooltip':
      return (
        <div style={{ ...rowStyle, minHeight: 220, padding: '4rem 2rem', width: '100%', justifyContent: 'center' }}>
          {(example === 'directions' ? ['top', 'right', 'bottom', 'left'] : ['top']).map(direction => (
            <Tooltip key={direction} message={direction} direction={direction as 'top'}>
              <Button variant="outline">{direction}</Button>
            </Tooltip>
          ))}
        </div>
      );
    default:
      return <span>Preview is available in the usage example above.</span>;
  }
}
