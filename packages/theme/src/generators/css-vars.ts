/**
 * CSS custom properties generator for web application.
 * Generates CSS variables file (vars.css) from unified theme palettes.
 */

import type { ColorPalette } from '../palettes/types'
import lightPalette from '../palettes/light'
import darkPalette from '../palettes/dark'
import { spacingWeb } from '../tokens'

export interface GenerateCSSVarsOptions {
  lightPaletteOverride?: Partial<ColorPalette>
  darkPaletteOverride?: Partial<ColorPalette>
}

const mergeColorPalette = (base: ColorPalette, override?: Partial<ColorPalette>): ColorPalette => {
  if (!override || Object.keys(override).length === 0) {
    return base
  }

  const out: Record<string, unknown> = { ...base }

  ;(Object.keys(override) as (keyof ColorPalette)[]).forEach((key) => {
    const value = override[key]
    if (value === undefined) {
      return
    }

    const baseValue = base[key]
    if (
      typeof baseValue === 'object' &&
      baseValue !== null &&
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      out[key as string] = { ...(baseValue as Record<string, unknown>), ...(value as Record<string, unknown>) }
    } else {
      out[key as string] = value
    }
  })

  return out as unknown as ColorPalette
}

/**
 * Convert camelCase to kebab-case.
 * Example: 'textSecondary' => 'text-secondary'
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Flatten a nested color palette object into CSS custom property declarations.
 * Example: { text: { primary: '#000' } } => '--color-text-primary: #000;'
 * Converts camelCase keys to kebab-case for CSS conventions.
 */
function flattenPaletteToCSS(palette: ColorPalette, indent = '  '): string[] {
  const vars: string[] = []

  function flatten(obj: unknown, prefix = 'color'): void {
    if (typeof obj !== 'object' || obj === null) return

    Object.entries(obj).forEach(([key, value]) => {
      const kebabKey = toKebabCase(key)
      if (typeof value === 'object' && value !== null) {
        // Recursively flatten nested objects
        flatten(value, `${prefix}-${kebabKey}`)
      } else {
        // Add CSS custom property
        vars.push(`${indent}--${prefix}-${kebabKey}: ${value};`)
      }
    })
  }

  flatten(palette)
  return vars
}

/**
 * Generate spacing CSS custom properties.
 * Uses web spacing scale (8px base): space-1=8px, space-2=16px, etc.
 */
function generateSpacingCSS(indent = '  '): string[] {
  return Object.entries(spacingWeb).map(([key, value]) => {
    return `${indent}--space-${key}: ${value}px;`
  })
}

/**
 * Generate complete CSS variables file content.
 * Includes light mode (default), dark mode override, and media query fallback.
 */
export function generateCSSVars(options: GenerateCSSVarsOptions = {}): string {
  const mergedLight = mergeColorPalette(lightPalette, options.lightPaletteOverride)
  const mergedDark = mergeColorPalette(darkPalette, options.darkPaletteOverride)

  // For web, restore original colors that differ from mobile's unified palette
  const webLightPalette: ColorPalette = {
    ...mergedLight,
    background: {
      ...mergedLight.background,
      paper: '#FFFFFF',
      default: '#F4F4F4',
    },
    error: {
      dark: '#AC2C3B',
      main: '#FF5F72',
      light: '#FFB4BD',
      background: '#FFE6EA',
    },
    success: {
      dark: '#028D4C',
      main: '#00B460',
      light: '#D3F2E4',
      background: '#EFFAF1',
    },
    info: {
      dark: '#52BFDC',
      main: '#5FDDFF',
      light: '#D7F6FF',
      background: '#EFFCFF',
    },
    warning: {
      dark: '#C04C32',
      main: '#FF8061',
      light: '#FFBC9F',
      background: '#FFF1E0',
    },
  }

  const webDarkPalette: ColorPalette = {
    ...mergedDark,
    error: {
      dark: '#AC2C3B',
      main: '#FF5F72',
      light: '#FFB4BD',
      background: '#2F2527',
    },
    success: {
      dark: '#388E3C',
      main: '#00B460',
      light: '#81C784',
      background: '#1F2920',
    },
    info: {
      dark: '#52BFDC',
      main: '#5FDDFF',
      light: '#B7F0FF',
      background: '#19252C',
    },
    warning: {
      dark: '#C04C32',
      main: '#FF8061',
      light: '#FFBC9F',
      background: '#2F2318',
    },
  }

  const lightVars = flattenPaletteToCSS(webLightPalette)
  const darkVars = flattenPaletteToCSS(webDarkPalette)
  const spacingVars = generateSpacingCSS()

  return `/* This file is generated from @safe-global/theme. Do not edit directly. */

:root {
${lightVars.join('\n')}
${spacingVars.join('\n')}
}

[data-theme="dark"] {
${darkVars.join('\n')}
}

/* The same as above for the brief moment before JS loads */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
${darkVars.map((v) => '  ' + v).join('\n')}
  }
}
`
}
