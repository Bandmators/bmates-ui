/**
 * Builds a before/after visual report for the design-rules audit.
 *
 * Both panes render identical markup — only the stylesheet differs. The "before"
 * sheet is reconstructed from git HEAD, the "after" sheet from the working tree.
 * Each specimen lives in its own pair of iframes so the two CSS sets, which use
 * the same class names, cannot leak into each other.
 *
 * Usage: node scripts/build-visual-report.mjs [--ref <git-ref>]
 * Output: report/index.html
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const refArg = process.argv.indexOf('--ref');
const BASE_REF = refArg !== -1 ? process.argv[refArg + 1] : 'HEAD';

const ENTRIES = ['src/styles/base.css', 'src/styles/components.css', 'src/styles/theme-vars.css'];

/** Reads a repo-relative path from git (before) or the working tree (after). */
function readSource(repoPath, fromGit) {
  if (!fromGit) return readFileSync(join(root, repoPath), 'utf8');
  try {
    return execFileSync('git', ['show', `${BASE_REF}:${repoPath}`], { cwd: root, encoding: 'utf8' });
  } catch {
    // File did not exist at the base ref (e.g. styles/menu.css is new).
    return '';
  }
}

/** Inlines @import statements depth-first so the result is a single stylesheet. */
function bundle(repoPath, fromGit, seen = new Set()) {
  if (seen.has(repoPath)) return '';
  seen.add(repoPath);

  const source = readSource(repoPath, fromGit);
  const dir = posix.dirname(repoPath.split('\\').join('/'));

  return source.replace(/@import\s+['"]([^'"]+)['"]\s*;/g, (_, spec) => {
    const target = posix.normalize(posix.join(dir, spec));
    return bundle(target, fromGit, seen);
  });
}

function buildSheet(fromGit) {
  return ENTRIES.map(entry => bundle(entry, fromGit)).join('\n');
}

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap');`;

const FRAME_CHROME = `
  html { background: transparent }
  body { margin: 0; padding: 16px; font-family: 'Barlow', system-ui, sans-serif; color: var(--text); background: var(--background) }
  .specimen { display: flex; flex-wrap: wrap; align-items: center; gap: 16px }
  .specimen--stack { flex-direction: column; align-items: stretch }
  /* Ruler overlay: a 4px grid so off-grid geometry is visible, toggled by the host. */
  body[data-grid='on'] { background-image: repeating-linear-gradient(to bottom, rgba(255,0,90,.16) 0 1px, transparent 1px 4px) }
`;

/**
 * Specimens are static markup mirroring each component's real DOM, so the
 * report has no runtime dependency on React or the built bundle.
 */
const ICON_CHECK = `<svg viewBox="0 0 24 24" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>`;
const ICON_CHEVRON = `<svg class="bm-accordion__icon" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>`;
const ICON_INFO = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

const menuRows = prefix => `
  <div class="bm-portal" style="position:static">
    <ul class="bm-${prefix}__list">
      <li class="bm-${prefix}__label">Section</li>
      <li class="bm-${prefix}__item">Profile<span class="bm-${prefix}__shortcut">⌘P</span></li>
      <li class="bm-${prefix}__item">Settings<span class="bm-${prefix}__shortcut">⌘,</span></li>
      <li class="bm-${prefix}__divider"></li>
      <li class="bm-${prefix}__item bm-${prefix}__item--disabled">Disabled row</li>
    </ul>
  </div>`;

const SPECIMENS = [
  {
    id: 'toggle',
    title: 'Toggle',
    note: 'Highest risk. Previously declared no font-size or line-height, so it inherited from the host page — the "before" pane shows it at the page default, not a fixed size.',
    html: `
      <button class="bm-toggle bm-toggle--size-sm">Small</button>
      <button class="bm-toggle bm-toggle--size-md">Medium</button>
      <button class="bm-toggle bm-toggle--size-lg">Large</button>
      <button class="bm-toggle bm-toggle--size-md bm-toggle--selected">Selected</button>
      <button class="bm-toggle bm-toggle--size-md bm-toggle--disabled">Disabled</button>`,
  },
  {
    id: 'menu-dropdown',
    title: 'Dropdown menu',
    note: 'Row padding 8.8px → 12px, gap 9.6px → 8px, font 13.6px → 14px. Items also gain font-weight 500, which only Dropdown was missing.',
    html: menuRows('dropdown'),
  },
  {
    id: 'menu-select',
    title: 'Select menu',
    note: 'Same primitive as Dropdown — the two panes should now be indistinguishable from each other (DR-3.3).',
    html: `
      <div class="bm-portal" style="position:static">
        <ul class="bm-select__list">
          <li class="bm-select__label">Fruit</li>
          <li class="bm-select__item bm-select__item--selected" aria-selected="true">Apple</li>
          <li class="bm-select__item" aria-selected="false">Banana</li>
          <li class="bm-select__divider"></li>
          <li class="bm-select__item bm-select__item--disabled" aria-selected="false">Sold out</li>
        </ul>
      </div>`,
  },
  {
    id: 'menu-search',
    title: 'Search menu',
    note: 'Input padding 7.2/8.8px → 6/10px, margin 4.8px → 4px.',
    html: `
      <div class="bm-portal" style="position:static">
        <input class="bm-search__input" placeholder="Search…" />
        <ul class="bm-search__list">
          <li class="bm-search__label">Results</li>
          <li class="bm-search__item">First result</li>
          <li class="bm-search__item">Second result</li>
        </ul>
      </div>`,
  },
  {
    id: 'menu-context',
    title: 'Context menu',
    note: 'Fourth instance of the same primitive.',
    html: `
      <div class="bm-portal" style="position:static">
        <ul class="bm-context-menu">
          <li class="bm-context-menu__item">Cut</li>
          <li class="bm-context-menu__item">Copy</li>
          <li class="bm-context-menu__item bm-context-menu__item--disabled">Paste</li>
        </ul>
      </div>`,
  },
  {
    id: 'switch',
    title: 'Switch',
    note: 'Knob geometry re-gridded. md knob 19.2px → 20px, insets now 2px / 4px. Knob colour is now a token, so it follows the theme instead of staying #fff.',
    stack: true,
    html: `
      <label class="bm-switch bm-switch--align-center"><span class="bm-switch__box bm-switch__box--size-sm"></span><span class="bm-switch__label">sm</span></label>
      <label class="bm-switch bm-switch--align-center"><span class="bm-switch__box bm-switch__box--size-md"></span><span class="bm-switch__label">md</span></label>
      <label class="bm-switch bm-switch--align-center"><span class="bm-switch__box bm-switch__box--size-md bm-switch__box--checked bm-switch__box--variant-primary"></span><span class="bm-switch__label">md checked</span></label>
      <label class="bm-switch bm-switch--align-center"><span class="bm-switch__box bm-switch__box--size-lg bm-switch__box--checked bm-switch__box--variant-success"></span><span class="bm-switch__label">lg checked</span></label>
      <label class="bm-switch bm-switch--align-center"><span class="bm-switch__box bm-switch__box--size-xl"></span><span class="bm-switch__label">xl</span></label>`,
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    note: 'Label spacing moved from margin-left to gap (same 16px). Radius 4px → --radius-xs. Check stroke was hardcoded white, now --primary-fg.',
    stack: true,
    html: `
      <label class="bm-checkbox bm-checkbox--align-center"><span class="bm-checkbox__box">${ICON_CHECK}</span><span class="bm-checkbox__label">Unchecked</span></label>
      <label class="bm-checkbox bm-checkbox--align-center"><span class="bm-checkbox__box bm-checkbox__box--checked">${ICON_CHECK}</span><span class="bm-checkbox__label">Checked</span></label>`,
  },
  {
    id: 'badge',
    title: 'Badge',
    note: 'font-size was 75% — relative to context, so it rendered at a different size inside a heading than inside body text. The pane below shows a badge in both contexts.',
    stack: true,
    html: `
      <div class="specimen">
        <span class="bm-badge bm-badge--size-sm bm-badge--variant-primary">sm</span>
        <span class="bm-badge bm-badge--size-md bm-badge--variant-success">md</span>
        <span class="bm-badge bm-badge--size-lg bm-badge--variant-outline">lg</span>
      </div>
      <h2 style="margin:8px 0 0;font-size:24px">Heading <span class="bm-badge bm-badge--size-md bm-badge--variant-info">in h2</span></h2>
      <p style="margin:0;font-size:14px">Body text <span class="bm-badge bm-badge--size-md bm-badge--variant-info">in p</span></p>`,
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    note: 'Padding 6.4/9.6px → 6/10px, font 12.8px → 12px. Rendered forced-visible.',
    html: `<span class="bm-tooltip" style="position:static;display:inline-block;transform:none">Tooltip content</span>`,
  },
  {
    id: 'alert',
    title: 'Alert',
    note: 'Padding-x 14px → 16px, gap 10px → 8px, icon 18px → 16px, title line-height 1.35 → 1.2.',
    stack: true,
    html: `
      <div class="bm-alert bm-alert--info"><span class="bm-alert__icon">${ICON_INFO}</span><p class="bm-alert__title">Heads up</p><div class="bm-alert__description">This alert spans two lines so the description line-height is visible in comparison.</div></div>
      <div class="bm-alert bm-alert--danger"><span class="bm-alert__icon">${ICON_INFO}</span><p class="bm-alert__title">Something failed</p><div class="bm-alert__description">Short description.</div></div>`,
  },
  {
    id: 'accordion',
    title: 'Accordion',
    note: 'Item margin-bottom → parent gap, so the trailing 8px below the last item is gone. Disabled opacity .6 → .5.',
    stack: true,
    html: `
      <div class="bm-accordion">
        <div class="bm-accordion__item"><button class="bm-accordion__head" data-open="true"><span class="bm-accordion__title">Open item</span><span class="bm-accordion__indicator" data-open="true">${ICON_CHEVRON}</span></button><div class="bm-accordion__content" data-open="true" style="max-height:none"><div class="bm-accordion__content-inner">Panel content.</div></div></div>
        <div class="bm-accordion__item"><button class="bm-accordion__head"><span class="bm-accordion__title">Closed item</span><span class="bm-accordion__indicator">${ICON_CHEVRON}</span></button></div>
        <div class="bm-accordion__item"><button class="bm-accordion__head" disabled><span class="bm-accordion__title">Disabled item</span><span class="bm-accordion__indicator">${ICON_CHEVRON}</span></button></div>
      </div>
      <div style="height:4px;background:repeating-linear-gradient(90deg,#f0355a 0 6px,transparent 6px 12px)"></div>
      <small style="color:var(--muted);font-size:12px">↑ the striped bar marks where content directly after the accordion begins</small>`,
  },
  {
    id: 'card',
    title: 'Card',
    note: 'head/footer margins replaced by grid gap on the card itself. Description line-height 1.428 → 1.5.',
    stack: true,
    html: `
      <div class="bm-card">
        <div class="bm-card__head"><h3 class="bm-card__title">Card title</h3><p class="bm-card__description">A description that wraps onto a second line to expose the line-height change.</p></div>
        <div class="bm-card__body">Body content</div>
        <div class="bm-card__footer"><button class="bm-button bm-button--variant-primary bm-button--size-md">Action</button></div>
      </div>`,
  },
  {
    id: 'dialog',
    title: 'Dialog',
    note: 'Header now uses gap (6px → 8px between title and description). Title line-height 1 → 1.2, so descenders are no longer clipped. Description 1.4 → 1.5.',
    stack: true,
    html: `
      <div class="bm-dialog" style="position:static;transform:none;max-width:420px">
        <div class="bm-dialog__header"><h2 class="bm-dialog__title">Paging typography</h2><p class="bm-dialog__description">Watch the descenders in "Paging typography" — the old line-height of 1 clipped them.</p></div>
        <div class="bm-dialog__footer bm-dialog__footer--justify-end"><button class="bm-button bm-button--variant-outline bm-button--size-md">Cancel</button><button class="bm-button bm-button--variant-primary bm-button--size-md">Confirm</button></div>
      </div>`,
  },
  {
    id: 'table',
    title: 'Table',
    note: 'Horizontal padding widened toward the 2:1 density ratio (md 10/12 → 10/16).',
    stack: true,
    html: `
      <div class="bm-table-wrapper"><table class="bm-table bm-table--size-md bm-table--hoverable">
        <thead><tr class="bm-table__row"><th class="bm-table__head">Name</th><th class="bm-table__head">Role</th><th class="bm-table__head">Status</th></tr></thead>
        <tbody class="bm-table__body">
          <tr class="bm-table__row"><td class="bm-table__cell">Ada</td><td class="bm-table__cell">Engineer</td><td class="bm-table__cell"><span class="bm-badge bm-badge--size-sm bm-badge--variant-success">Active</span></td></tr>
          <tr class="bm-table__row"><td class="bm-table__cell">Grace</td><td class="bm-table__cell">Designer</td><td class="bm-table__cell"><span class="bm-badge bm-badge--size-sm bm-badge--variant-outline">Away</span></td></tr>
        </tbody>
      </table></div>`,
  },
  {
    id: 'pagination',
    title: 'Pagination',
    note: 'line-height was 40px on a 40px box — flex centering already handled it. Now 1.2 with an explicit 14px font.',
    html: `
      <ul class="bm-pagination">
        <li><a class="bm-pagination__link">1</a></li>
        <li><a class="bm-pagination__link bm-pagination__link--selected">2</a></li>
        <li><a class="bm-pagination__link">3</a></li>
        <li><a class="bm-pagination__link bm-pagination__link--disabled">›</a></li>
      </ul>`,
  },
  {
    id: 'tabs',
    title: 'Tabs',
    note: 'sm font 13px → 12px, trigger line-height 1.25 → 1.2.',
    stack: true,
    html: `
      <div class="bm-tabs bm-tabs--size-sm"><div class="bm-tabs__list"><button class="bm-tabs__trigger bm-tabs__trigger--active">Small</button><button class="bm-tabs__trigger">Second</button></div></div>
      <div class="bm-tabs"><div class="bm-tabs__list"><button class="bm-tabs__trigger bm-tabs__trigger--active">Medium</button><button class="bm-tabs__trigger">Second</button></div></div>
      <div class="bm-tabs bm-tabs--size-lg"><div class="bm-tabs__list"><button class="bm-tabs__trigger bm-tabs__trigger--active">Large</button><button class="bm-tabs__trigger">Second</button></div></div>`,
  },
  {
    id: 'toast',
    title: 'Toast',
    note: 'Title line-height 1.25rem → 1.2, description 1rem → 1.5 (descriptions were the tightest text in the library at ratio 1.33). The spring entrance curve is unchanged — it moved to --transition-bounce rather than being flattened.',
    stack: true,
    html: `
      <div class="bm-toast bm-toast--variant-default bm-toast--active" style="max-width:340px">
        <span class="bm-toast__title">Descending glyphs: pygmy jay</span>
        <span class="bm-toast__description">A description long enough to wrap onto a second line, which is where the 1.33 → 1.5 change becomes visible.</span>
      </div>
      <div class="bm-toast bm-toast--variant-success bm-toast--active" style="max-width:340px">
        <span class="bm-toast__title">Saved</span>
        <span class="bm-toast__description">Single-line description.</span>
      </div>`,
  },
  {
    id: 'label',
    title: 'Label',
    note: 'line-height 1 → 1.2. The old value clipped descenders; the box below has a background so the clipping is visible against it.',
    stack: true,
    html: `
      <span class="bm-label" style="background:var(--surface-hover)">Typography, pygmy jays</span>
      <label class="bm-label" style="background:var(--surface-hover)">gjpqy — descender row</label>`,
  },
  {
    id: 'file-input',
    title: 'Input — description & file label',
    note: 'Description line-height 1.428 → 1.5; FileInput label icon gap 6.4px → 8px. The input itself is unchanged, pending A1.',
    stack: true,
    html: `
      <div class="bm-input-group">
        <input class="bm-input" value="Input value" />
        <p class="bm-input__description">A helper description that wraps onto a second line so the line-height change is visible here.</p>
      </div>
      <span class="bm-file-input__label bm-file-input__label--variant-default">${ICON_CHECK}<span>Choose file</span></span>`,
  },
  {
    id: 'textarea',
    title: 'Textarea',
    note: 'min-height 36px → 40px, joining the control scale. line-height 1.428 → 1.5, since a textarea is multi-line body text rather than a single-line control label (DR-5.2, not DR-5.4).',
    stack: true,
    html: `
      <textarea class="bm-textarea" rows="1">Single row</textarea>
      <textarea class="bm-textarea" rows="3">Multiple lines of content
so the line-height change
is visible across rows.</textarea>`,
  },
  {
    id: 'data-table',
    title: 'DataTable',
    note: 'Missed by the original audit — caught later by stylelint. Toolbar gap 10px → 12px, and the filter input now declares line-height and pulls its height from the shared scale.',
    stack: true,
    html: `
      <div class="bm-data-table">
        <div class="bm-data-table__toolbar"><input class="bm-data-table__filter" placeholder="Filter…" /></div>
        <div class="bm-table-wrapper"><table class="bm-table bm-table--size-md">
          <thead><tr class="bm-table__row"><th class="bm-table__head bm-data-table__selection"><input type="checkbox" /></th><th class="bm-table__head"><button class="bm-data-table__sort bm-data-table__sort--enabled">Name ↕</button></th></tr></thead>
          <tbody class="bm-table__body"><tr class="bm-table__row" data-selected="true"><td class="bm-table__cell bm-data-table__selection"><input type="checkbox" checked /></td><td class="bm-table__cell">Selected row</td></tr></tbody>
        </table></div>
      </div>`,
  },
  {
    id: 'controls-row',
    title: 'Composition — the DR-9.1 check',
    note: 'The rule that motivated the whole audit: same-size controls in a row must form one unbroken band. Before = five controls at five different heights (38 / 38 / indeterminate / 32 / 40px). After = all 40px. This is the payoff.',
    html: `
      <button class="bm-button bm-button--variant-primary bm-button--size-md">Button</button>
      <input class="bm-input" style="width:140px" value="Input" />
      <button class="bm-toggle bm-toggle--size-md">Toggle</button>
      <div class="bm-tabs"><div class="bm-tabs__list"><button class="bm-tabs__trigger bm-tabs__trigger--active">Tabs</button></div></div>
      <a class="bm-pagination__link">1</a>
      <span class="bm-file-input__label bm-file-input__label--variant-outline">File</span>`,
  },
  {
    id: 'controls-sizes',
    title: 'Composition — all three sizes',
    note: 'Each row should be internally flush: 32px, 40px, 48px. The striped rules behind each row mark the target height.',
    stack: true,
    html: ['sm', 'md', 'lg']
      .map(
        size => `
      <div class="specimen" style="padding:0;background:repeating-linear-gradient(90deg,rgba(99,102,241,.14) 0 6px,transparent 6px 12px)">
        <button class="bm-button bm-button--variant-primary bm-button--size-${size}">Button ${size}</button>
        <button class="bm-toggle bm-toggle--size-${size}">Toggle</button>
        <div class="bm-tabs bm-tabs--size-${size}"><div class="bm-tabs__list"><button class="bm-tabs__trigger bm-tabs__trigger--active">Tabs</button></div></div>
      </div>`,
      )
      .join(''),
  },
  {
    id: 'button',
    title: 'Button (reference — icon gap only)',
    note: 'Only the icon gap changed (6.4px → 8px). Heights are untouched, pending A1.',
    html: `
      <button class="bm-button bm-button--variant-primary bm-button--size-sm">Small</button>
      <button class="bm-button bm-button--variant-primary bm-button--size-md">${ICON_CHECK}<span>With icon</span></button>
      <button class="bm-button bm-button--variant-outline bm-button--size-lg">Large</button>`,
  },
];

/** Escapes a full document for embedding in a srcdoc="" attribute. */
const forSrcdoc = doc => doc.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function frame(sheet, specimen) {
  const body = `<div class="specimen${specimen.stack ? ' specimen--stack' : ''}">${specimen.html}</div>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<style>${FONT}</style>
<link rel="stylesheet" href="${sheet}">
<style>${FRAME_CHROME}</style>
<script>
  addEventListener('message', e => {
    if (e.data.theme) document.documentElement.dataset.theme = e.data.theme;
    if ('grid' in e.data) document.body.dataset.grid = e.data.grid ? 'on' : 'off';
  });
  const send = () => parent.postMessage({ id: ${JSON.stringify(specimen.id)}, h: document.documentElement.scrollHeight }, '*');
  addEventListener('load', send);
  new ResizeObserver(send).observe(document.documentElement);
</script>
</head><body>${body}</body></html>`;
}

function section(specimen) {
  return `
<section class="card" id="${specimen.id}">
  <header>
    <h2>${specimen.title}</h2>
    <p>${specimen.note}</p>
  </header>
  <div class="panes">
    <div class="pane"><span class="tag tag--before">Before</span><iframe data-id="${specimen.id}" srcdoc="${forSrcdoc(frame('before.css', specimen))}"></iframe></div>
    <div class="pane"><span class="tag tag--after">After</span><iframe data-id="${specimen.id}" srcdoc="${forSrcdoc(frame('after.css', specimen))}"></iframe></div>
  </div>
</section>`;
}

const beforeCss = buildSheet(true);
const afterCss = buildSheet(false);

const baseSha = execFileSync('git', ['rev-parse', '--short', BASE_REF], { cwd: root, encoding: 'utf8' }).trim();

const html = `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BMates UI — design rules visual diff</title>
<style>${FONT}
  :root { --ui-bg:#fafafa; --ui-fg:#18181b; --ui-muted:#71717a; --ui-line:#e4e4e7; --ui-card:#fff }
  html[data-ui='dark'] { --ui-bg:#141416; --ui-fg:#ececef; --ui-muted:#a1a1aa; --ui-line:#2e2e33; --ui-card:#1c1c1f }
  * { box-sizing:border-box }
  body { margin:0; padding:32px 24px 96px; font-family:'Barlow',system-ui,sans-serif; color:var(--ui-fg); background:var(--ui-bg) }
  .wrap { max-width:1180px; margin:0 auto }
  h1 { margin:0 0 4px; font-size:26px }
  .sub { margin:0 0 24px; color:var(--ui-muted); font-size:14px }
  .toolbar { position:sticky; top:0; z-index:10; display:flex; flex-wrap:wrap; gap:8px; align-items:center;
             margin:0 0 24px; padding:12px; border:1px solid var(--ui-line); border-radius:12px;
             background:color-mix(in srgb, var(--ui-card) 88%, transparent); backdrop-filter:blur(8px) }
  .toolbar button { padding:6px 12px; border:1px solid var(--ui-line); border-radius:8px; background:var(--ui-card);
                    color:var(--ui-fg); font:inherit; font-size:13px; cursor:pointer }
  .toolbar button[aria-pressed='true'] { border-color:#6366f1; background:#6366f1; color:#fff }
  .toolbar .sep { flex:1 }
  .toc { display:flex; flex-wrap:wrap; gap:6px; margin:0 0 28px }
  .toc a { padding:4px 10px; border:1px solid var(--ui-line); border-radius:999px; background:var(--ui-card);
           color:var(--ui-muted); font-size:12px; text-decoration:none }
  .toc a:hover { color:var(--ui-fg) }
  .card { margin:0 0 22px; border:1px solid var(--ui-line); border-radius:14px; background:var(--ui-card); overflow:hidden }
  .card header { padding:16px 18px 14px; border-bottom:1px solid var(--ui-line) }
  .card h2 { margin:0 0 4px; font-size:17px }
  .card header p { margin:0; color:var(--ui-muted); font-size:13px; line-height:1.5 }
  .panes { display:grid; grid-template-columns:1fr 1fr }
  .panes > .pane + .pane { border-left:1px solid var(--ui-line) }
  .pane { position:relative; min-width:0 }
  .tag { position:absolute; top:8px; right:8px; z-index:2; padding:2px 8px; border-radius:999px;
         font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase }
  .tag--before { color:#9a3412; background:#ffedd5 }
  .tag--after { color:#166534; background:#dcfce7 }
  iframe { display:block; width:100%; border:0 }
  body.overlay .panes { grid-template-columns:1fr; position:relative }
  body.overlay .panes > .pane + .pane { position:absolute; inset:0; border-left:0; mix-blend-mode:difference; filter:invert(1) }
  body.overlay .tag { display:none }
  .legend { margin:24px 0 0; padding:14px 16px; border:1px dashed var(--ui-line); border-radius:12px;
            color:var(--ui-muted); font-size:13px; line-height:1.6 }
</style>
</head>
<body>
<div class="wrap">
  <h1>Design rules — before / after</h1>
  <p class="sub">Identical markup in both panes; only the stylesheet differs.
     <strong>Before</strong> = <code>${baseSha}</code>, <strong>After</strong> = working tree.</p>

  <div class="toolbar">
    <button id="theme" aria-pressed="false">Dark component theme</button>
    <button id="grid" aria-pressed="false">4px grid overlay</button>
    <button id="overlay" aria-pressed="false">Difference overlay</button>
    <span class="sep"></span>
    <button id="ui">Invert page chrome</button>
  </div>

  <nav class="toc">${SPECIMENS.map(s => `<a href="#${s.id}">${s.title}</a>`).join('')}</nav>

  ${SPECIMENS.map(s => section(s)).join('')}

  <p class="legend">
    <strong>4px grid overlay</strong> paints a horizontal 4px rule inside each frame — geometry that lands between
    lines is off-grid.<br>
    <strong>Difference overlay</strong> stacks the two panes with a difference blend: anything that is pixel-identical
    goes white, and every remaining mark is a real change.<br>
    Heights of Button / Input / Textarea are deliberately unchanged — that is finding A1, deferred as a breaking change.
  </p>
</div>
<script>
  // Frames self-report their height so nothing is cut off or padded.
  addEventListener('message', e => {
    const { id, h } = e.data || {};
    if (!id || !h) return;
    document.querySelectorAll('iframe[data-id="' + id + '"]').forEach(f => {
      const tallest = Math.max(...[...document.querySelectorAll('iframe[data-id="' + id + '"]')].map(x => +x.dataset.h || 0), h);
      f.dataset.h = h;
      f.style.height = tallest + 'px';
    });
  });

  const post = msg => document.querySelectorAll('iframe').forEach(f => f.contentWindow.postMessage(msg, '*'));
  const toggle = (btn, fn) => btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    fn(on);
  });

  toggle(theme, on => post({ theme: on ? 'dark' : 'light' }));
  toggle(grid, on => post({ grid: on }));
  toggle(overlay, on => document.body.classList.toggle('overlay', on));
  ui.addEventListener('click', () => {
    document.documentElement.dataset.ui = document.documentElement.dataset.ui === 'dark' ? '' : 'dark';
  });
</script>
</body></html>`;

const outDir = join(root, 'report');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'before.css'), beforeCss);
writeFileSync(join(outDir, 'after.css'), afterCss);
const out = join(outDir, 'index.html');
writeFileSync(out, html);
console.log(`Wrote ${relative(root, out)}  (${(html.length / 1024).toFixed(0)} kB, ${SPECIMENS.length} specimens)`);
console.log(`  before.css  ${baseSha}       ${(beforeCss.length / 1024).toFixed(1)} kB`);
console.log(`  after.css   working tree  ${(afterCss.length / 1024).toFixed(1)} kB`);

/**
 * Coverage guard: every component stylesheet that differs between the two refs
 * should have a specimen, otherwise the report silently hides a change.
 * Components whose diff is provably invisible are listed as exempt.
 */
const EXEMPT = {
  'Avatar/avatar.css': 'border-radius 50% → --radius-full; both render a full circle',
};

const changed = execFileSync('git', ['diff', '--name-only', BASE_REF, '--', 'src/components'], {
  cwd: root,
  encoding: 'utf8',
  // Silence git's CRLF advisory warnings; only stdout is meaningful here.
  stdio: ['ignore', 'pipe', 'ignore'],
})
  .split('\n')
  .filter(line => line.endsWith('.css'))
  .map(line => line.replace('src/components/', ''));

const specimenBlob = SPECIMENS.map(s => `${s.id} ${s.html}`).join(' ').toLowerCase();
const uncovered = changed.filter(file => {
  if (EXEMPT[file]) return false;
  // Match on the BEM block a stylesheet owns, e.g. Input/input.css → "bm-input".
  const block = `bm-${file.split('/')[1].replace('.css', '')}`;
  return !specimenBlob.includes(block);
});

for (const [file, why] of Object.entries(EXEMPT)) {
  if (changed.includes(file)) console.log(`  exempt: ${file} — ${why}`);
}

if (uncovered.length) {
  console.warn(`\n⚠  ${uncovered.length} changed stylesheet(s) have no specimen:`);
  for (const file of uncovered) console.warn(`     ${file}`);
  console.warn('   Add a specimen or an EXEMPT entry in scripts/build-visual-report.mjs.');
  process.exitCode = 1;
} else {
  console.log(`\n✓ all ${changed.length} changed stylesheet(s) covered`);
}
