import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function tablePreview() {
  return createElement(Preview, { component: 'table' });
}
