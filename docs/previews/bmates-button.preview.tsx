import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function buttonPreview() {
  return createElement(Preview, { component: 'button' });
}
