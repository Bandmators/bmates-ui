import { cx } from '@/styles/classnames';
import { createPortal } from 'react-dom';

import useContext from '@/hooks/useContext';
import { canUseDOM } from '@/libs/dom';

import Portal, { PortalProps } from './Portal';
import { PortalContext } from './PortalContext';
import { portalBGRecipe } from './portal.recipe';

export const PortalContent = ({
  children,
  ref,
  width,
  disabledBG = false,
  disabledAutoFocus = false,
  onKeyDown,
  ...props
}: PortalProps) => {
  const { showModal, setShowModal, portalDocument } = useContext(PortalContext)!;

  const close = () => {
    setShowModal(false);
  };

  if (!canUseDOM) return null;

  const portalTarget = portalDocument?.body ?? document.body;

  return (
    <>
      {showModal &&
        createPortal(
          <>
            {!disabledBG && (
              <PortalBG
                id="bmates-portal-bg"
                className="bmates-portal-bg"
                onClick={close}
                onContextMenu={(evt: React.MouseEvent) => {
                  evt.preventDefault();
                  close();
                }}
              />
            )}
            <Portal
              id="bmates-portal"
              ref={ref}
              width={width}
              onKeyDown={onKeyDown}
              disabledAutoFocus={disabledAutoFocus}
              {...props}
            >
              {children}
            </Portal>
          </>,
          portalTarget,
        )}
    </>
  );
};

const PortalBG = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
  <div className={cx(portalBGRecipe(), className)} {...props} />
);
