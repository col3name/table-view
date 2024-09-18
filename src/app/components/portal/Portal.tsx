import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { randomID } from '../../shared/lib/common';

type PortalPropsType = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export const Portal: React.FC<PortalPropsType> = ({
  id = 'root-modal',
  className = '',
  children,
}) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let target = document.getElementById(id) as HTMLDivElement | null;
    let created = false;
    if (!target) {
      created = true;
      target = document.createElement('div');
      target.id = `portal-${id || randomID()}`;
      target.className = className;
      document.body.appendChild(target);
    } else {
      target.className = className;
    }
    setElement(target);
    return () => {
      if (target && created) {
        document.body.removeChild(target);
      }
    };
  }, [id, className]);

  if (!element) {
    return null;
  }
  return createPortal(children, element);
};
