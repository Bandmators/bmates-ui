import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { maxMedia, minMedia } from '../libs/media';
import {
  BMateBreakpoints,
  BMateColorScales,
  BMateColors,
  BMatePrimaryDarkScale,
  BMatePrimaryLightScale,
  BMateSpacing,
  BMateTypography,
} from '../styles/theme';

describe('Lib test', () => {
  test('generates correct media query strings', () => {
    const { mobile, tablet, desktop, desktopLarge } = BMateBreakpoints;
    expect(minMedia.mobile).toBe(`@media screen and (min-width: ${mobile})`);
    expect(minMedia.tablet).toBe(`@media screen and (min-width: ${tablet})`);
    expect(maxMedia.desktop).toBe(`@media screen and (max-width: ${desktop})`);
    expect(maxMedia.desktopLarge).toBe(`@media screen and (max-width: ${desktopLarge})`);
  });

  test('exposes a shared primitive and responsive token contract', () => {
    expect(BMateColors.primaryScale[100]).toBe('#F5F5F5');
    expect(BMateColorScales.primary[100]).toBe('#F5F5F5');
    expect(BMatePrimaryLightScale[100]).toBe('#F5F5F5');
    expect(BMatePrimaryDarkScale[100]).toBe('#29292D');
    expect(BMateColorScales.primaryDark[100]).toBe('#29292D');
    expect(BMateColors.secondary).toBe('#F1F3F5');
    expect(BMateColors.infoScale[600]).toBe('#2563eb');
    expect(BMateColors.success).toBe('#22c55e');
    expect(BMateColors['danger-hover']).toBe('#dc2626');
    expect(BMateSpacing[6]).toBe('1.5rem');
    expect(BMateTypography['font-size-2xl']).toBe('1.5rem');
    expect(BMateBreakpoints.lg).toBe('1024px');
    expect(minMedia.lg).toBe('@media screen and (min-width: 1024px)');
  });

  test('publishes CSS tokens and responsive aliases', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles/theme-vars.css'), 'utf8');

    expect(css).toContain('--primary-100: #f5f5f5');
    expect(css).toContain('--primary-light-100: #f5f5f5');
    expect(css).toContain('--primary-dark-100: #29292d');
    expect(css).toContain('--secondary-dark-soft: #29292d');
    expect(css).toContain('--success-dark-soft-fg: #4ade80');
    expect(css).toContain('--info-600: #2563eb');
    expect(css).toContain('--success: var(--success-500)');
    expect(css).toContain('--info-fg: #ffffff');
    expect(css).toContain('--space-6: 1.5rem');
    expect(css).toContain('--breakpoint-lg: 1024px');
    expect(css).toContain('@media screen and (min-width: 1024px)');
  });
});
