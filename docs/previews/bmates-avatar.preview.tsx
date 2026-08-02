import { createElement } from 'react';

import Preview from './bmates-all.preview';

export default function avatarPreview() {
  return createElement(Preview, { component: 'avatar' });
}
