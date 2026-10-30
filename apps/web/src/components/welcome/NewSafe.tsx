import React from 'react'
import css from './styles.module.css'
import WelcomeLogin from './WelcomeLogin'
import WelcomeRightPanel from './WelcomeRightPanel'
import SafeLogo from '@/public/images/logo.svg'
import footerCss from './welcomeFooter.module.css'
import Footer from '../common/Footer'
import TEMPLATE_CONFIG from '@/config/templateConfig'

const welcomeLogoStyle = (): React.CSSProperties => {
  const { W, H } = TEMPLATE_CONFIG.LOGO_DIMENSIONS?.WELCOME ?? {}
  const base: React.CSSProperties = { display: 'block' }
  if (W && H) {
    return { ...base, width: W, height: H }
  }
  if (!W && !H) {
    return {}
  }
  if (H) {
    return { ...base, width: 'auto', height: H }
  }
  return { ...base, maxWidth: W, height: 'auto' }
}

const NewSafe = () => {
  return (
    <div className={css.loginPage}>
      <div className={css.leftSide}>
        <div className={css.logoContainer}>
          <SafeLogo className={css.logo} style={welcomeLogoStyle()} />
        </div>
        <div className={css.loginContainer}>
          <WelcomeLogin />
        </div>
        <Footer forceShow versionIcon={false} helpCenter={false} preferences={false} className={footerCss.footer} />
      </div>

      <div
        className={css.rightSide}
        style={{
          background: TEMPLATE_CONFIG.WELCOME_PALETTE
            ? `linear-gradient(-90deg, ${TEMPLATE_CONFIG.WELCOME_PALETTE})`
            : TEMPLATE_CONFIG.IS_LICENSED
            ? 'linear-gradient(-90deg, #10b8ff, #b2efff)'
            : undefined,
        }}
      >
        <WelcomeRightPanel />
      </div>
    </div>
  )
}

export default NewSafe
