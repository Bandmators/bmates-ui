import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function checkboxPreview() {
  return createElement(Preview, { component: 'checkbox' });
}
