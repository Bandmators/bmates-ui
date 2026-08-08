/**
 * Asserts DR-2.1: every interactive control resolves to the shared 32/40/48px
 * height scale.
 *
 * Works on the cascade directly via postcss rather than through a DOM — jsdom's
 * CSS parser rejects `@layer`, and the thing under test is a static value, so
 * no layout engine is needed.
 *
 * Run `node scripts/build-visual-report.mjs` first; this reads report/after.css.
 */
import { readFileSync } from 'node:fs';
import postcss from 'postcss';

const css = readFileSync(new URL('../report/after.css', import.meta.url), 'utf8');
const root = postcss.parse(css);

/** Custom properties declared on :root / :where(:root). */
const rootVars = new Map();
root.walkRules(rule => {
  if (!/:root|:host/.test(rule.selector)) return;
  rule.walkDecls(/^--/, decl => rootVars.set(decl.prop, decl.value.trim()));
});

/**
 * Merges declarations from every rule whose selector list mentions one of the
 * given classes, in source order — the same order the cascade would apply them
 * (all rules here share one layer and one specificity class).
 */
function computed(classes) {
  const decls = new Map();
  root.walkRules(rule => {
    const selectors = rule.selectors ?? [];
    const hit = selectors.some(sel => classes.includes(sel.trim()));
    if (!hit) return;
    rule.walkDecls(decl => decls.set(decl.prop, decl.value.trim()));
  });
  return decls;
}

/** Expands var() against the element's own props, then :root. */
function resolveVars(value, local) {
  let out = value;
  for (let i = 0; i < 6 && out.includes('var('); i += 1) {
    out = out.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/g, (_, name, fallback) => {
      const declared = local.get(name) ?? rootVars.get(name);
      return (declared ?? fallback ?? '').trim();
    });
  }
  return out.trim();
}

const toPx = token => (token.endsWith('rem') ? Number.parseFloat(token) * 16 : Number.parseFloat(token));

/** Evaluates `calc(a - b)` / `calc(a + b)` and bare lengths. */
function evaluate(value) {
  const calc = value.match(/^calc\((.+)\)$/);
  if (!calc) return toPx(value);
  const [a, op, b] = calc[1].trim().split(/\s+/);
  return op === '-' ? toPx(a) - toPx(b) : toPx(a) + toPx(b);
}

const CASES = [
  ['Button sm', ['.bm-button', '.bm-button--size-sm'], 32],
  ['Button md', ['.bm-button', '.bm-button--size-md'], 40],
  ['Button lg', ['.bm-button', '.bm-button--size-lg'], 48],
  ['Button icon', ['.bm-button', '.bm-button--size-icon'], 40],
  ['Input', ['.bm-input'], 40],
  ['Textarea', ['.bm-textarea'], 40],
  ['FileInput label', ['.bm-file-input__label'], 40],
  ['Toggle sm', ['.bm-toggle', '.bm-toggle--size-sm'], 32],
  ['Toggle md', ['.bm-toggle', '.bm-toggle--size-md'], 40],
  ['Toggle lg', ['.bm-toggle', '.bm-toggle--size-lg'], 48],
  ['Pagination link', ['.bm-pagination__link'], 40],
  ['Search input', ['.bm-search__input'], 32],
  ['DataTable filter', ['.bm-data-table__filter'], 32],
];

/** Tabs sets its height variable on the root and consumes it on the track. */
const TABS = [
  ['Tabs track sm', ['.bm-tabs', '.bm-tabs--size-sm'], 32],
  ['Tabs track md', ['.bm-tabs'], 40],
  ['Tabs track lg', ['.bm-tabs', '.bm-tabs--size-lg'], 48],
];

let failures = 0;

function report(label, px, expected) {
  const pass = px === expected;
  if (!pass) failures += 1;
  console.log(`${pass ? 'ok  ' : 'FAIL'}  ${label.padEnd(18)} ${String(px).padStart(5)}px  (expect ${expected}px)`);
}

for (const [label, classes, expected] of CASES) {
  const decls = computed(classes);
  const raw = decls.get('min-height');
  if (!raw) {
    failures += 1;
    console.log(`FAIL  ${label.padEnd(18)}    —     (no min-height declared)`);
    continue;
  }
  report(label, evaluate(resolveVars(raw, decls)), expected);
}

for (const [label, classes, expected] of TABS) {
  const wrapper = computed(classes);
  const track = computed(['.bm-tabs__list']);
  // The track reads --bm-control-h from its wrapper.
  const merged = new Map([...wrapper, ...track, ['--bm-control-h', wrapper.get('--bm-control-h')]]);
  report(label, evaluate(resolveVars(track.get('min-height'), merged)), expected);
}

console.log(failures ? `\n${failures} control(s) off the DR-2.1 scale.` : '\nAll controls on the 32/40/48 scale.');
process.exit(failures ? 1 : 0);
