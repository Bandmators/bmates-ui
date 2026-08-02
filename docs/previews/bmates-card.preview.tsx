import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function cardPreview() {
  return createElement(Preview, { component: 'card' });
}
