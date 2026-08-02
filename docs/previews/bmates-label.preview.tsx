import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function labelPreview() {
  return createElement(Preview, { component: 'label' });
}
