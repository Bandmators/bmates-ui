import { PortalProvider } from '@/components/Portal/PortalProvider';
import { AlignType } from '@/types/align';

interface SearchProps extends React.PropsWithChildren {
  align?: AlignType;
  space?: number;
}

/**
 * Displays a list of menus.
 * @returns
 */
export const Search = ({ align = 'center', space = 0, children }: SearchProps) => {
  return (
    <PortalProvider align={align} space={space}>
      {children}
    </PortalProvider>
  );
};
