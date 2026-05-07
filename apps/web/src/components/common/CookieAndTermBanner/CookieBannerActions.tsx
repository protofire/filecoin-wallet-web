import type { ReactElement } from 'react'
import { Grid, Button, Typography } from '@mui/material'
import { useIsOfficialHost } from '@/hooks/useIsOfficialHost'
import { styles } from './constants'

const CookieBannerActions = ({
  onAccept,
  onAcceptAll,
}: {
  onAccept: () => void
  onAcceptAll: () => void
}): ReactElement => {
  const isOfficialHost = useIsOfficialHost()

  return (
    <Grid container sx={styles.buttonsGrid}>
      <Grid item>
        <Typography>
          <Button onClick={onAccept} variant="text" size="small" color="inherit" disableElevation>
            Save settings
          </Button>
        </Typography>
      </Grid>

      {isOfficialHost ? (
        <Grid item>
          <Button onClick={onAcceptAll} variant="contained" color="secondary" size="small" disableElevation>
            Accept all
          </Button>
        </Grid>
      ) : null}
    </Grid>
  )
}

export default CookieBannerActions
