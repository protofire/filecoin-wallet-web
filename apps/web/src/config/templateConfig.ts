import type { TemplateConfig } from './constants.extra'

const NETWORK_CONFIG = {
  EIP155: false,
  SUPPORTED_VERSIONS: ['1.3.0', '1.4.1'],
  LOGO_DIMENSIONS: {
    HEADER: {
      H: '48px',
    },
    WELCOME: {
      W: '200px',
      H: '80px',
    },
  },
  EXTRA_FOOTER_LINKS: [
    { label: 'Docs', link: 'https://docs.filecoin.io/smart-contracts/advanced/multisig#safe-multisig' },
  ],
  WELCOME_PALETTE: '#39c1cb, #006fec',
} as TemplateConfig
export default NETWORK_CONFIG
