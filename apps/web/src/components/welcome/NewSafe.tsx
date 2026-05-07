import React from 'react'
import { Typography } from '@mui/material'
import css from './styles.module.css'
import WelcomeLogin from './WelcomeLogin'
import SafeLogo from '@/public/images/logo.svg'
import footerCss from './welcomeFooter.module.css'
import Footer from '../common/Footer'
import TEMPLATE_CONFIG from '@/config/templateConfig'

const NewSafe = () => {
  return (
    <div className={css.loginPage}>
      <div className={css.leftSide}>
        <div className={css.logoContainer}>
          <SafeLogo className={css.logo} />
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
        <div className={css.rightContent}>
          <Typography className={css.label}>FOR ORGANIZATIONS AND POWER USERS</Typography>
          <Typography className={css.mainTitle}>Own your assets onchain securely</Typography>
        </div>
        <div className={css.mockupImageContainer}>
          <img src="/images/welcome/safe-mockup.png" alt="Safe interface mockup" className={css.mockupImage} />
        </div>
      </div>
    </div>
  )
}

export default NewSafe
