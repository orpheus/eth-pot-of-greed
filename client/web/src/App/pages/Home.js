import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import { DrizzleCtx } from 'Components/providers/DrizzleProvider'
import PotOfGreed from 'Components/modules/PotOfGreed'

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'auto',
    height: '100%'
  },
  body: {
    height: '100%'
  }
}))

const Home = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const {drizzle, drizzleState} = React.useContext(DrizzleCtx)

  useDocumentTitle(t('app.page.home'))

  if (drizzleState.loading) return <h1> Loading Drizzle </h1>
  return <div className={classes.root}>
    <div className={classes.body}>
      <PotOfGreed drizzle={drizzle} drizzleState={drizzleState.drizzleState} />
    </div>
  </div>
}

export default Home
