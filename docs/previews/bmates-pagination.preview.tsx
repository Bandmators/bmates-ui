import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function paginationPreview() {
  return createElement(Preview, { component: 'pagination' });
}
