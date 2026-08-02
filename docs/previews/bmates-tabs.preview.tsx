import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function tabsPreview() {
  return createElement(Preview, { component: 'tabs' });
}
