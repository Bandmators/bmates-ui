import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function accordionPreview() {
  return createElement(Preview, { component: 'accordion' });
}
