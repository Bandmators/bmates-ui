import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function alertPreview() {
  return createElement(Preview, { component: 'alert' });
}
