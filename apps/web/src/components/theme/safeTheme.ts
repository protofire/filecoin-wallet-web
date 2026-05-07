import type { PaletteMode, Theme } from '@mui/material'
import { createTheme } from '@mui/material/styles'
// This import includes MUI type extensions via side-effect
import { generateMuiTheme } from '@safe-global/theme'

import templateDarkPalette from '@/config/templateDarkPalette'
import templateLightPalette from '@/config/templateLightPalette'

const getTemplatePalette = (mode: PaletteMode) =>
  mode === 'dark' ? templateDarkPalette : templateLightPalette

/**
 * Create Safe-themed MUI theme for the given mode.
 * Uses the unified theme package, then merges optional per-template palette
 * overrides from `prebuild-config` (network `*Palette.json`).
 */
const createSafeTheme = (mode: PaletteMode): Theme => {
  const baseTheme = generateMuiTheme(mode)
  const templatePalette = getTemplatePalette(mode)

  if (Object.keys(templatePalette).length === 0) {
    return baseTheme
  }

  return createTheme(baseTheme, { palette: templatePalette })
}

export default createSafeTheme
