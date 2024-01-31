import * as React from 'react';

const useModal = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (showModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.setProperty('overflow', 'hidden', 'important');
      document.body.style.marginRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.marginRight = `${0}px`;
    }
  }, [showModal]);

  return [showModal, setShowModal];
};

export default useModal;
