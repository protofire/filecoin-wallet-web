/**
 * Script to generate CSS variables file from the unified theme package.
 * Merges template palette overrides (from `prebuild-config`) so `--color-*` matches MUI.
 * Run with: yarn css-vars
 */
import type { ColorPalette } from '../../../packages/theme/src/palettes/types'
import { generateCSSVars } from '../../../packages/theme/src/generators/css-vars'

import templateDarkPalette from '../src/config/templateDarkPalette'
import templateLightPalette from '../src/config/templateLightPalette'

const css = generateCSSVars({
  lightPaletteOverride: templateLightPalette as Partial<ColorPalette>,
  darkPaletteOverride: templateDarkPalette as Partial<ColorPalette>,
})
console.log(css)
