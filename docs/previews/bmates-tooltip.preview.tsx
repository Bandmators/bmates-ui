import { Button, Tooltip } from 'bmates-ui';

export default function TooltipPreview() {
  return (
    <Tooltip message="Save the current changes">
      <Button aria-label="Save">Hover or focus me</Button>
    </Tooltip>
  );
}
