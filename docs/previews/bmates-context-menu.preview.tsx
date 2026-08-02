import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function contextMenuPreview() {
  return createElement(Preview, { component: 'context-menu' });
}
