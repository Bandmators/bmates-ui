import { PropsWithChildren } from 'react';

/** @deprecated Import `bmates-ui/style.css`; this compatibility provider has no runtime styling work. */
const StyledProvider = ({ children }: PropsWithChildren) => <>{children}</>;
export default StyledProvider;
