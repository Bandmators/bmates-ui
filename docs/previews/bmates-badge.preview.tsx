import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function badgePreview() {
  return createElement(Preview, { component: 'badge' });
}
