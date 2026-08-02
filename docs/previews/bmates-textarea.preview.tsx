import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function textareaPreview() {
  return createElement(Preview, { component: 'textarea' });
}
