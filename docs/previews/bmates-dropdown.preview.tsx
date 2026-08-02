import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function dropdownPreview() {
  return createElement(Preview, { component: 'dropdown' });
}
