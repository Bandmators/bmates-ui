import { HoverCard, HoverCardContent, HoverCardToggle } from 'bmates-ui';

export default function HoverCardPreview() {
  return (
    <HoverCard>
      <HoverCardToggle>@bmates</HoverCardToggle>
      <HoverCardContent>
        <strong>BMates UI</strong>
        <p>A React component library.</p>
      </HoverCardContent>
    </HoverCard>
  );
}
