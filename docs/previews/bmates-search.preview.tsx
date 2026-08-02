import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function searchPreview() {
  return createElement(Preview, { component: 'search' });
}
