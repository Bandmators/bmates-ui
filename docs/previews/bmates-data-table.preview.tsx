import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function dataTablePreview() {
  return createElement(Preview, { component: 'data-table' });
}
