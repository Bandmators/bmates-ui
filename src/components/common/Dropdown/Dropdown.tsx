import { PortalProvider } from '@/components/portal/PortalProvider';
import { AlignType } from '@/types/align';

interface DropdownProps extends React.PropsWithChildren {
  align?: AlignType;
  space?: number;
}

/**
 * Displays a list of menus.
 * @returns
 */
export const Dropdown = ({ align = 'center', space = 0, children }: DropdownProps) => {
  return (
    <PortalProvider align={align} space={space}>
      {children}
    </PortalProvider>
  );
};
