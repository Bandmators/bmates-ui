import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function inputPreview() {
  return createElement(Preview, { component: 'input' });
}
